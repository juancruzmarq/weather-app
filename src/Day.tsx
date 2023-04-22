import React from 'react';

interface DayProps {
  day: string;
  min: number;
  max: number;
}

export const Day: React.FC<DayProps> = ({ day, min, max }) => {
  return (
    <>
      <div className='text-start border-b border-gray-100/10 ml-2 my-auto'>
        <h1 className='text-white'>{day}</h1>
      </div>
      <div className='text-end border-b border-gray-100/10 my-auto'>
        <h1 className='text-white font-thin'>
          {min}° <span className='text-white/60'>/</span> {max}°
        </h1>
      </div>
    </>
  );
};
