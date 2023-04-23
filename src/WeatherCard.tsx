import React, { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import Flag from 'react-world-flags';
import { Day } from './Day';
import { WeatherResponse } from './interfaces/weather.interface';
import { Iconos } from './Iconos';
import { CurrentWeatherResponse } from './interfaces/currentWeather.interface';

interface WeatherCardProps {
  forecast: WeatherResponse;
  current: CurrentWeatherResponse;
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
}) => {
  const [fav, setFav] = useState(false);
  const [diaOnoche, setDiaOnoche] = useState(false);
  const [icon, setIcon] = useState<string>();
  const handleFav = () => {
    setFav(!fav);
  };
  const [today, setToday] = useState(() => {
    const today = new Date();
    const day = today.getDay();
    return days[day];
  });
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

  useEffect(() => {
    console.log(current?.weather[0].main);
    setDaysWeather(getDaysOfWeek());
    setDiaOnoche(itsDay(forecast?.list?.[0].dt) || false);
    // invertir la lista
    const list = forecast?.list?.reverse();
    // obtener el promedio de la temperatura minima y maxima de cada dia
    const result = list?.reduce((acc: any, item) => {
      const fecha = new Date(item.dt * 1000);
      const dia = fecha.getDay();
      if (!acc[dia]) {
        acc[dia] = {
          min: item.main.temp_min,
          max: item.main.temp_max,
          count: 1, // agregamos un contador para calcular el promedio
        };
      } else {
        acc[dia].min += item.main.temp_min;
        acc[dia].max += item.main.temp_max;
        acc[dia].count += 1;
      }
      return acc;
    }, {});

    // calcular el promedio para cada día y agregarlo al resultado
    Object.keys(result).forEach((dia) => {
      const { min, max, count } = result[dia];
      result[dia] = {
        min: min / count,
        max: max / count,
      };
    });
    // agregar el promedio a partir del segundo dia al arreglo de dias de la semana
    setDaysWeather((daysWeather) => {
      return daysWeather?.map((day, index) => {
        return {
          ...day,
          min: Math.round(result?.[index].min),
          max: Math.round(result?.[index].max),
        };
      });
    });
  }, []);

  return (
    <div className='grid opacity-40 blur-sm grid-cols-2 p-4  w-full bg-gradient-to-br rounded-md shadow-xl border-r border-b border-white/20 relative'>
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
        <button className='w-full h-full' onClick={handleFav}>
          {fav ? <AiOutlineHeart /> : <AiFillHeart />}
        </button>
      </div>
      <div className='w-5 h-5 rounded-full text-white/30 absolute bottom-[-13px] left-[-8px] opacity-2'>
        <div className='shadow-xl  shadow-gray-400 border border-white/30 '>
          <Flag code={forecast?.city.country.toLowerCase()} />
        </div>
      </div>
      <div className='grid grid-cols-2 grid-rows-5 text-xs font-extralight border-r border-white/20 pr-4'>
        {daysWeather?.map((day, index) => (
          <Day key={index} day={day.day} min={day.min} max={day.max} />
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
