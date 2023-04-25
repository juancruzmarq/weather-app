import Flag from 'react-world-flags';
import { LocationResponse } from './interfaces/location.interface';
import { useEffect, useState } from 'react';

interface SearchCardProps {
  results: LocationResponse[];
  setCity: (lat: number, lon: number) => void;
  show: () => void;
  isShowing: boolean;
}

const SearchCard: React.FC<SearchCardProps> = ({
  results,
  setCity,
  show,
  isShowing,
}: SearchCardProps) => {
  const [filteredResults, setFilteredResults] = useState<LocationResponse[]>(
    []
  );

  // Delete duplicates result.name result.state result.country
  const removeDuplicates = (arr: LocationResponse[]) => {
    const uniqueArray = arr.filter((obj, pos, arr) => {
      return (
        arr
          .map((mapObj) => mapObj.name + mapObj.state + mapObj.country)
          .indexOf(obj.name + obj.state + obj.country) === pos
      );
    });
    return uniqueArray;
  };

  useEffect(() => {
    setFilteredResults(removeDuplicates(results));
  }, [results]);

  return (
    <div
      className={
        isShowing
          ? `inset-0 whitespace-nowrap overflow-auto scrollbar-hide overflow-y-auto fixed z-10 top-48 w-full h-full items-center bg-transparent animate-fade-in opacity-100 transform-translate-y-0 transition duration-1000 ease-out`
          : `inset-0 whitespace-nowrap overflow-auto scrollbar-hide overflow-y-auto fixed z-10 top-48 w-full h-full items-center bg-transparent animate-fade-out opacity-0 transform-translate-y-10 transition duration-1000 ease-out`
      }
      onClick={show}
    >
      <div className='flex text-center justify-items-center align-middle items-center w-full justify-center'>
        <div className='grid grid-flow-row text-white font-thin bg-gradient-to-tl from-slate-900 via-slate-900/90 to-slate-900   w-[90%]  p-4 rounded-md border-b border-r shadow-2xl shadow-white/10 border-white/30 gap-3 max-w-md'>
          {filteredResults.map((result) => (
            <button
              onClick={() => setCity(result.lat, result.lon)}
              className='text-start border-b text-md border-white/20 border-r bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-800 p-2 rounded-sm'
            >
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
      </div>
    </div>
  );
};

export default SearchCard;
