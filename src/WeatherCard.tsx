import { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import Flag from 'react-world-flags';
import { Day } from './Day';
import { WeatherResponse } from './interfaces/weather.interface';
import { Iconos } from './Iconos';
import { CurrentWeatherResponse } from './interfaces/currentWeather.interface';
import { FavouriteData, Favourites } from './App';

interface TemperatureData {
  [key: string]: {
    min: number;
    max: number;
  };
}

interface WeatherCardProps {
  forecast: WeatherResponse;
  current: CurrentWeatherResponse;
  show: boolean;
  setFavourite: (data: FavouriteData) => void;
  favs: Favourites[] | null;
}
const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

interface DaysWeather {
  day: string;
  min: number;
  max: number;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  forecast,
  current,
  show,
  setFavourite,
  favs,
}) => {
  const [fav, setFav] = useState(false);
  const [diaOnoche, setDiaOnoche] = useState(false);
  const [daysWeather, setDaysWeather] = useState<DaysWeather[] | undefined>();

  function itsDay(timestamp: number) {
    const fecha = new Date(timestamp);
    const hora = fecha.getHours();
    return hora >= 6 && hora <= 18;
  }

  function getDaysOfWeek(): DaysWeather[] {
    const today = new Date().getDay();
    const result: string[] = [];
    for (let i = 1; i <= 5; i++) {
      const index = (today + i) % 7;
      result.push(days[index]);
    }
    const daysResult = result.map((day) => {
      return {
        day,
        min: 0,
        max: 0,
      };
    });
    return daysResult;
  }

  function obtenerTemps() {
    const currentDate = new Date();

    const filteredForecasts = forecast?.list.filter((forecast) => {
      const date = new Date(forecast.dt * 1000);
      return date.getDate() !== currentDate.getDate();
    });

    const temperatureData: TemperatureData = {};

    filteredForecasts?.forEach((forecast) => {
      const dia = days[new Date(forecast.dt * 1000).getDay()];
      const max = forecast?.main.temp_max;
      const min = forecast?.main.temp_min;
      if (temperatureData[dia]) {
        if (temperatureData[dia].max < max) {
          temperatureData[dia].max = max;
        }
        if (temperatureData[dia].min > min) {
          temperatureData[dia].min = min;
        }
      } else {
        temperatureData[dia] = {
          max,
          min,
        };
      }
    });
    return temperatureData;
  }

  useEffect(() => {
    setDaysWeather(getDaysOfWeek());
    const daysOfweek = getDaysOfWeek();
    setDiaOnoche(itsDay(forecast?.list?.[0].dt) || false);
    const temps = obtenerTemps();
    const resultsMap = daysOfweek.map((day) => {
      return {
        ...day,
        min: Math.round(temps[day.day].min),
        max: Math.round(temps[day.day].max),
      };
    });

    setDaysWeather(resultsMap);
    // Check if the current city is in the favourites
    handleIsFav();
  }, []);

  function handleIsFav() {
    if (favs) {
      const isFav = favs.find(
        (fav) =>
          fav.lat === forecast?.city.coord.lat &&
          fav.lon === forecast?.city.coord.lon
      );
      if (isFav) {
        setFav(true);
      }
    }
  }

  function handleFav() {
    setFavourite({
      current,
      weather: forecast,
    });
  }

  return (
    <div
      className={`${
        show ? 'blur-sm ' : null
      } grid transition-all delay-300  grid-cols-2 p-4  w-full bg-gradient-to-br rounded-md shadow-xl border-r border-b border-white/10 relative shadow-gray-900/40`}
    >
      <div
        className='w-10 h-10
             rounded-full  absolute top-[-14px] right-[-15px]'
      >
        <img
          src={
            diaOnoche
              ? Iconos[current?.weather[0].main as keyof typeof Iconos].day
              : Iconos[current?.weather[0].main as keyof typeof Iconos].night
          }
          alt={current?.weather[0].main}
        />
      </div>
      <div className='w-8 h-8 rounded-full text-red-400/40 text-2xl absolute bottom-[10px] right-[10px]'>
        <button className='w-full h-full' onClick={() => handleFav()}>
          {fav ? <AiFillHeart /> : <AiOutlineHeart />}
        </button>
      </div>
      <div className='w-5 h-5 rounded-full text-white/30 absolute bottom-[-13px] left-[-8px] opacity-2'>
        <div className='shadow-xl  shadow-gray-400 border border-white/30 '>
          <Flag code={forecast?.city.country.toLowerCase()} />
        </div>
      </div>
      <div className='grid grid-cols-2 grid-rows-5 text-xs font-extralight border-r border-white/20 pr-4'>
        {daysWeather?.map((day, index) => (
          <Day
            key={index}
            day={day.day}
            min={day.min ? day.min : 0}
            max={day.max ? day.max : 0}
          />
        ))}
      </div>
      <div className='grid grid-rows-4 grid-cols-1 justify-center text-center'>
        <div className='row-span-1'>
          <h1 className='text-white text-xl '>{forecast?.city.name}</h1>
        </div>
        <div className='row-span-2 my-auto'>
          <h1 className='text-white text-6xl ml-6 font-medium'>
            {Math.round(current?.main?.temp)}°
          </h1>
        </div>
        <div className='row-span-1 my-auto'>
          <h1 className='text-white/80 text-xs font-thin'>
            {Math.round(current?.main.temp_min)}° /{' '}
            {Math.round(current?.main.temp_max)}°
          </h1>
        </div>
      </div>
    </div>
  );
};
