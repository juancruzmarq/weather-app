import React, { useEffect, useState } from 'react';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import Flag from 'react-world-flags';
import { Day } from './Day';
import { WeatherResponse } from './interfaces/weather.interface';
import ClearDay from './icons/clear-day.svg';
import { Iconos } from './Iconos';

interface WeatherCardProps {
  country: WeatherResponse;
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
export const WeatherCard: React.FC<WeatherCardProps> = ({ country }) => {
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
  const [daysWeather, setDaysWeather] = useState<string[]>([]);

  function itsDay(timestamp: number) {
    const fecha = new Date(timestamp);
    const hora = fecha.getHours();
    return hora >= 6 && hora <= 18;
  }

  function getDaysOfWeek() {
    const today = new Date().getDay();
    const result = [];
    for (let i = 1; i <= 5; i++) {
      const index = (today + i) % 7;
      result.push(days[index]);
    }
    return result;
  }
  function esDeDia(fecha: Date): boolean {
    const hora = fecha.getHours();
    console.log(hora);
    return hora >= 6 && hora <= 18;
  }
  useEffect(() => {
    console.log(country);
    setDaysWeather(getDaysOfWeek());
    setDiaOnoche(itsDay(country?.list?.[0].dt) || false);
  }, []);

  return (
    <div className='grid grid-cols-2 p-4  w-full bg-gradient-to-br rounded-md shadow-xl border-r border-b border-white/20 relative'>
      <div
        className='w-10 h-10
             rounded-full  absolute top-[-14px] right-[-15px]'
      >
        <img
          src={
            diaOnoche
              ? Iconos[
                  country?.list?.[0].weather[0].main as keyof typeof Iconos
                ].day
              : Iconos[
                  country?.list?.[0].weather[0].main as keyof typeof Iconos
                ].night
          }
        />
      </div>
      <div className='w-8 h-8 rounded-full text-white/30 text-2xl absolute bottom-[10px] right-[10px]'>
        <button className='w-full h-full' onClick={handleFav}>
          {fav ? <AiOutlineHeart /> : <AiFillHeart />}
        </button>
      </div>
      <div className='w-5 h-5 rounded-full text-white/30 absolute bottom-[-13px] left-[-8px] opacity-2'>
        <div className='shadow-xl  shadow-gray-400 border border-white/30 '>
          <Flag code={country?.city.country.toLowerCase()} />
        </div>
      </div>
      <div className='grid grid-cols-2 grid-rows-5 text-xs font-extralight border-r border-white/20 pr-4'>
        {daysWeather.map((day, index) => (
          <Day key={index} day={day} min={10} max={10} />
        ))}
      </div>
      <div className='grid grid-rows-4 grid-cols-1 justify-center text-center'>
        <div className='row-span-1'>
          <h1 className='text-white text-xl '>{country?.city.name}</h1>
        </div>
        <div className='row-span-2 my-auto'>
          <h1 className='text-white text-6xl ml-6 font-medium'>
            {Math.round(country?.list?.[0].main.temp)}°
          </h1>
        </div>
        <div className='row-span-1 my-auto'>
          <h1 className='text-white/80 text-xs font-thin'>
            {Math.round(country?.list?.[0].main.temp_min)}° /{' '}
            {Math.round(country?.list?.[0].main.temp_max)}°
          </h1>
        </div>
      </div>
    </div>
  );
};
