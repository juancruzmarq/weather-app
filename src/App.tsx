import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { weatherApi } from './api/weather';
import { geocoderApi } from './api/geocoder';
import { WeatherResponse } from './interfaces/weather.interface';
import { WeatherCard } from './WeatherCard';
import { CurrentWeatherResponse } from './interfaces/currentWeather.interface';
import { AiOutlineHeart } from 'react-icons/ai';
import SearchCard from './SearchCard';
import { LocationResponse } from './interfaces/location.interface';

export interface Favourites {
  lat: number;
  lon: number;
}

export interface FavouriteData {
  weather: WeatherResponse;
  current: CurrentWeatherResponse;
}

function App() {
  const [favourites, setFavourites] = useState<Favourites[] | null>(() => {
    const fav = JSON.parse(window.localStorage.getItem('fav') || '[]');
    if (fav) {
      return fav;
    }
    return null;
  });
  const [results, setResults] = useState<LocationResponse[] | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [selectedCity, setSelectedCity] = useState<WeatherResponse | null>(
    null
  );
  const [forecastCity, setForecastCity] =
    useState<CurrentWeatherResponse | null>(null);
  const [favouriteData, setFavouriteData] = useState<FavouriteData[] | null>(
    null
  );
  const [query, setQuery] = useState<string>('');

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const results = await geocoderApi.getCity(query, 7);
    setResults(results.data);
    setShowSearch(true);
    setQuery('');
  };

  const handleShow = () => {
    setShowSearch(!showSearch);
    setResults(null);
  };

  const handleSetFavourite = (data: FavouriteData) => {
    if (favourites) {
      const exists = favourites.find(
        (fav) =>
          fav.lat === data.current.coord.lat &&
          fav.lon === data.current.coord.lon
      );
      if (!exists) {
        const newFav = [...favourites, data.current.coord];
        window.localStorage.setItem('fav', JSON.stringify(newFav));
        setFavourites(newFav);
        setFavouriteData((prev) => {
          if (prev) {
            return [...prev, data];
          }
          return [data];
        });
      } else {
        const newFav = favourites.filter(
          (fav) =>
            fav.lat !== data.current.coord.lat &&
            fav.lon !== data.current.coord.lon
        );
        window.localStorage.setItem('fav', JSON.stringify(newFav));
        setFavourites(newFav);
        setFavouriteData((prev) => {
          if (prev) {
            return prev.filter(
              (favData) =>
                favData.current.coord.lat !== data.current.coord.lat &&
                favData.current.coord.lon !== data.current.coord.lon
            );
          }
          return null;
        });
      }
    } else {
      window.localStorage.setItem('fav', JSON.stringify([data.current.coord]));
      setFavourites([data.current.coord]);
    }
  };

  const handleSetCity = async (lat: number, lon: number) => {
    setSelectedCity(null);
    setForecastCity(null);
    const currentWeather = await weatherApi.getCurrentWeather(lat, lon);
    const weather = await weatherApi.getWeather(lat, lon);
    setSelectedCity(weather.data);
    setForecastCity(currentWeather.data);
    setShowSearch(false);
  };

  const callApi = async () => {
    try {
      favourites &&
        favourites.map(async (fav) => {
          const { data: weather } = await weatherApi.getWeather(
            fav.lat,
            fav.lon
          );
          const { data: current } = await weatherApi.getCurrentWeather(
            fav.lat,
            fav.lon
          );
          setFavouriteData((prev) => {
            // dont add if already exists
            if (
              prev &&
              prev.find((favData) => favData.current.id === current.id)
            ) {
              return prev;
            }
            return [...(prev || []), { weather, current }];
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const favs = JSON.parse(window.localStorage.getItem('fav') || '[]');
    setFavourites(favs);
    callApi();
  }, []);

  return (
    <>
      <div className='whitespace-nowrap overflow-auto scrollbar-hide flex justify-center min-h-screen max-h-screen w-screen bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 bg-slate-200 '>
        <div className='max-w-md bg-none flex flex-col m-5 w-full rounded-xl gap-4'>
          <div className='flex flex-row justify-center p-2 bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 h-min w-full rounded-xl  items-center gap-4 border-l border-r border-white/10 shadow-xl'>
            <Logo /> <h1 className='text-4xl text-white font-thin'>Weather</h1>
          </div>
          <form action='' onSubmit={(e) => handleSearch(e)}>
            <div className='flex flex-row w-full h-min gap-2 mb-2'>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type='text'
                placeholder='Search for a city'
                className='focus:outline-1 focus:outline-gray-400/20 focus:border-none  text-md rounded-md w-3/5 p-2 border-b border-r font-thin border-gray-300/20 shadow-xl text-white bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 placeholder:text-white/30 '
              />
              <button
                type='submit'
                className='text-md rounded-md w-2/5  border-r border-b font-thin border-gray-300/20 shadow-xl text-white bg-gradient-to-r'
              >
                Search
              </button>
            </div>
          </form>
          {results && showSearch && (
            <SearchCard
              results={results}
              setCity={handleSetCity}
              show={handleShow}
              isShowing={showSearch}
            />
          )}

          {selectedCity && forecastCity ? (
            <WeatherCard
              key={selectedCity.cod}
              forecast={selectedCity}
              current={forecastCity}
              setFavourite={handleSetFavourite}
              favs={favourites}
              show={showSearch}
            />
          ) : null}
          <div className='border-b border-white/20 flex flex-row text-center justify-items-center align-bottom items-center gap-2 justify-start'>
            <h1 className='text-xl text-white font-thin mb-2'>Favourites</h1>
            <span className='text-red-500/30'>
              <AiOutlineHeart />
            </span>
          </div>
          {favouriteData &&
            favouriteData.map((data) => (
              <WeatherCard
                key={data.weather.cod}
                forecast={data.weather}
                current={data.current}
                setFavourite={handleSetFavourite}
                favs={favourites}
                show={showSearch}
              />
            ))}
        </div>
      </div>
    </>
  );
}

export default App;
