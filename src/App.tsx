import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { weatherApi } from './api/weather';
import { geocoderApi } from './api/geocoder';
import { WeatherResponse } from './interfaces/weather.interface';
import { WeatherCard } from './WeatherCard';

function App() {
  const [fav, setFav] = useState(false);
  const [paris, setParis] = useState<WeatherResponse | null>(null);
  const [newYork, setNewYork] = useState<WeatherResponse | null>(null);

  useEffect(() => {
    const callApi = async () => {
      try {
        const parisData = await weatherApi.getWeather(48.8534951, 2.3483915);
        setParis(parisData.data);
        const newYorkData = await weatherApi.getWeather(40.71, -74.01);
        setNewYork(newYorkData.data);
      } catch (error) {
        console.log(error);
      }
    };
    callApi();
    // geocoderApi.getCity(5).then((res) => {
    //   console.log(res);
    // });
  }, []);
  return (
    <>
      <div className='flex justify-center min-h-screen w-screen bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 bg-slate-200 '>
        <div className='flex flex-col bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 m-5 w-full rounded-xl gap-4'>
          <div className='flex flex-row justify-center p-2 bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 h-min w-full rounded-xl  items-center gap-4 border-l border-r border-white/10 shadow-xl'>
            <Logo /> <h1 className='text-4xl text-white font-thin'>Weather</h1>
          </div>
          <div className='flex flex-row w-full h-min gap-2'>
            <input
              type='text'
              placeholder='Search for a city'
              className='text-md rounded-md w-3/5 p-2 border-b border-r font-thin border-gray-300/20 shadow-xl text-white bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 placeholder:text-white/30 '
            />
            <button className='text-md rounded-md w-2/5  border-r border-b font-thin border-gray-300/20 shadow-xl text-white bg-gradient-to-r'>
              Search
            </button>
          </div>
          {paris && <WeatherCard country={paris} />}
          {newYork && <WeatherCard country={newYork} />}
        </div>
      </div>
    </>
  );
}

export default App;
