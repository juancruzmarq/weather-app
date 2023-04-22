import React from 'react';
import { Day } from './Day';
import { Logo } from './Logo';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import Flag from 'react-world-flags';
function App() {
  const [fav, setFav] = React.useState(false);
  const handleFav = () => {
    setFav(!fav);
  };
  return (
    <>
      <div className='flex justify-center min-h-screen w-screen bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 bg-slate-200 '>
        <div className='flex flex-col bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 m-5 w-full rounded-xl gap-4'>
          <div className='flex flex-row justify-center p-2 bg-gradient-to-tl from-slate-900 via-slate-800 to-slate-900 h-min w-full rounded-xl  items-center gap-4 border-l border-r border-white/10 shadow-xl'>
            <Logo /> <h1 className='text-4xl text-white font-thin'>Weather</h1>
          </div>
          <div className='w-full h-min'>
            <input
              type='text'
              placeholder='Paris'
              className='text-xl rounded-xl w-full h-12 p-2 border font-thin border-gray-300/30 shadow-xl text-white bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900'
            />
          </div>
          <div className='grid grid-cols-2 p-4  w-full bg-gradient-to-br rounded-md shadow-xl border-r border-b border-white/20 relative'>
            <div className='w-8 h-8 rounded-full bg-gradient-to-l shadow-md from-yellow-400 to-yellow-600 absolute top-[-6px] right-[-10px]'></div>
            <div className='w-8 h-8 rounded-full text-white/30 text-2xl absolute bottom-[10px] right-[10px]'>
              <button className='w-full h-full' onClick={handleFav}>
                {fav ? <AiOutlineHeart /> : <AiFillHeart />}
              </button>
            </div>
            <div className='w-5 h-5 rounded-full text-white/30 absolute bottom-[-13px] left-[-8px] opacity-2'>
              <div className='shadow-xl  shadow-gray-400 border border-white/30 '>
                <Flag code='fr' />
              </div>
            </div>
            <div className='grid grid-cols-2 grid-rows-5 text-xs font-extralight border-r border-white/20 pr-4'>
              <Day day='Monday' min={19} max={24} />
              <Day day='Tuesday' min={19} max={24} />
              <Day day='Wednesday' min={19} max={24} />
              <Day day='Thursday' min={19} max={24} />
              <Day day='Friday' min={19} max={24} />
            </div>
            <div className='grid grid-rows-4 grid-cols-1 justify-center text-center'>
              <div className='row-span-1'>
                <h1 className='text-white text-xl'>Paris</h1>
              </div>
              <div className='row-span-2 my-auto'>
                <h1 className='text-white text-6xl ml-6'>20°</h1>
              </div>
              <div className='row-span-1 my-auto'>
                <h1 className='text-white/80 text-xs font-thin'>19° / 22°</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
