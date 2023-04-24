import React from 'react';

export const Logo = () => {
  return (
    <div className='w-20 h-20 bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 rounded-md relative  border-b border-r border-white/10'>
      <div className='w-10 h-10 rounded-full bg-gradient-to-l from-yellow-400 to-yellow-600 absolute top-3 left-3'></div>
      <div className='w-10 h-10 rounded-full bg-white absolute bottom-4 right-4'></div>
      <div className='w-12 h-5 rounded-full bg-white absolute bottom-4 right-2'></div>
      <div className='w-12 h-8 rounded-full bg-white absolute bottom-4 left-3'></div>
    </div>
  );
};
