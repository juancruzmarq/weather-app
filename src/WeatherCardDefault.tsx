import { AiOutlineHeart } from 'react-icons/ai';
import Flag from 'react-world-flags';
import { Day } from './Day';
import { Iconos } from './Iconos';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
export const WeatherCardDefault = () => {
  return (
    <div className='grid grid-cols-2 p-4 blur-md w-full bg-gradient-to-br rounded-md shadow-xl border-r border-b border-white/20 relative'>
      <div
        className='w-10 h-10
             rounded-full  absolute top-[-14px] right-[-15px]'
      >
        <img src={Iconos.Clouds.day} />
      </div>
      <div className='w-8 h-8 rounded-full text-red-400/40 text-2xl absolute bottom-[10px] right-[10px]'>
        <button className='w-full h-full'>
          <AiOutlineHeart />
        </button>
      </div>
      <div className='w-5 h-5 rounded-full text-white/30 absolute bottom-[-13px] left-[-8px] opacity-2'>
        <div className='shadow-xl  shadow-gray-400 border border-white/30 '>
          <Flag code='fr' />
        </div>
      </div>
      <div className='grid grid-cols-2 grid-rows-5 text-xs font-extralight border-r border-white/20 pr-4'>
        {days.map((day, index) => (
          <Day key={index} day={day} min={19} max={24} />
        ))}
      </div>
      <div className='grid grid-rows-4 grid-cols-1 justify-center text-center'>
        <div className='row-span-1'>
          <h1 className='text-white text-xl '>Cordoba</h1>
        </div>
        <div className='row-span-2 my-auto'>
          <h1 className='text-white text-6xl ml-6 font-medium'>24°</h1>
        </div>
        <div className='row-span-1 my-auto'>
          <h1 className='text-white/80 text-xs font-thin'>19° / 20°</h1>
        </div>
      </div>
    </div>
  );
};
