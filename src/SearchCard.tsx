import React from 'react';
import Flag from 'react-world-flags';
import { LocationResponse } from './interfaces/location.interface';

interface SearchCardProps {
  results: LocationResponse[];
  setCity: React.Dispatch<React.SetStateAction<LocationResponse | null>>;
}

const SearchCard: React.FC<SearchCardProps> = ({
  results,
  setCity,
}: SearchCardProps) => {
  return (
    <div className='grid grid-flow-row  transition ease-in z-20 absolute text-white font-thin bg-gradient-to-tl from-slate-900 via-slate-900/90 to-slate-900 top-48 w-[90%] p-2 rounded-md border-b border-r shadow-2xl shadow-white/10 border-white/30 gap-3'>
      {results.map((result) => (
        <button className='text-start border-b text-md border-white/20 border-r bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-800 p-2 rounded-sm'>
          <div className='grid grid-rows-1 grid-cols-4'>
            <div className='col-span-3 '>
              {result.name} {result.state ? '- ' + result.state : null}
            </div>

            <div className='flex flex-row gap-2 justify-items-center  justify-center'>
              <Flag code={result.country} height='2' className='w-5' />
              {result.country}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SearchCard;
