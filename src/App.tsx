import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { weatherApi } from './api/weather';
import { geocoderApi } from './api/geocoder';
import { WeatherResponse } from './interfaces/weather.interface';
import { WeatherCard } from './WeatherCard';
import { WeatherCardDefault } from './WeatherCardDefault';
import { CurrentWeatherResponse } from './interfaces/currentWeather.interface';
import useDebounce from './hooks/useDebounce';
import useThrottle from './hooks/useThrottle';
import Flag from 'react-world-flags';
import SearchCard from './SearchCard';
import { LocationResponse } from './interfaces/location.interface';

function App() {
  const [fav, setFav] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<LocationResponse[] | null>(null);
  const [city, setCity] = useState<LocationResponse | null>(null);
  const [parisForecastData, setParisForecastData] =
    useState<WeatherResponse | null>(null);
  const [paris, setParis] = useState<CurrentWeatherResponse | null>(null);
  const [query, setQuery] = useState<string>('');

  const [newYorkForecastData, setNewYorkForecastData] =
    useState<WeatherResponse | null>(null);
  const [newYork, setNewYork] = useState<CurrentWeatherResponse | null>(null);

  const [buenosAiresForecastData, setBuenosAiresForecastData] =
    useState<WeatherResponse | null>(null);
  const [buenosAires, setBuenosAires] = useState<CurrentWeatherResponse | null>(
    null
  );

  const handleSearch = async () => {
    const results = await geocoderApi.getCity(query, 7);
    console.log(results.data);
    setResults(results.data);
  };

  useEffect(() => {
    const callApi = async () => {
      try {
        const parisForecast = await weatherApi.getWeather(
          48.8534951,
          2.3483915
        );
        setParisForecastData(parisForecast.data);

        const parisCurrent = await weatherApi.getCurrentWeather(
          48.8534951,
          2.3483915
        );
        setParis(parisCurrent.data);

        const newYorkForecast = await weatherApi.getWeather(40.71, -74.01);
        setNewYorkForecastData(newYorkForecast.data);

        const newYorkCurrent = await weatherApi.getCurrentWeather(
          40.71,
          -74.01
        );
        setNewYork(newYorkCurrent.data);
        console.log(newYorkCurrent.data);

        const buenosAiresForecast = await weatherApi.getWeather(
          -34.9206797,
          -57.9537638
        );
        setBuenosAiresForecastData(buenosAiresForecast.data);
        const BuenosAiresData = await weatherApi.getCurrentWeather(
          -34.9206797,
          -57.9537638
        );
        setBuenosAires(BuenosAiresData.data);
      } catch (error) {
        console.log(error);
      }
    };
    // callApi();
  }, []);
  return (
    <>
      <div className='flex justify-center min-h-screen w-screen bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 bg-slate-200 '>
        <div className='flex flex-col bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 m-5 w-full rounded-xl gap-4'>
          <div className='flex flex-row justify-center p-2 bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 h-min w-full rounded-xl  items-center gap-4 border-l border-r border-white/10 shadow-xl'>
            <Logo /> <h1 className='text-4xl text-white font-thin'>Weather</h1>
          </div>
          <div className='flex flex-row w-full h-min gap-2 mb-2'>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type='text'
              placeholder='Search for a city'
              className='text-md rounded-md w-3/5 p-2 border-b border-r font-thin border-gray-300/20 shadow-xl text-white bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 placeholder:text-white/30 '
            />
            <button
              onClick={handleSearch}
              className='text-md rounded-md w-2/5  border-r border-b font-thin border-gray-300/20 shadow-xl text-white bg-gradient-to-r'
            >
              Search
            </button>
          </div>
          {results && <SearchCard results={results} setCity={setCity} />}

          {parisForecastData && paris ? (
            <WeatherCard forecast={parisForecastData} current={paris} />
          ) : (
            <WeatherCardDefault />
          )}
          {newYorkForecastData && newYork ? (
            <WeatherCard forecast={newYorkForecastData} current={newYork} />
          ) : (
            <WeatherCardDefault />
          )}
          {buenosAiresForecastData && buenosAires ? (
            <WeatherCard
              forecast={buenosAiresForecastData}
              current={buenosAires}
            />
          ) : (
            <WeatherCardDefault />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
