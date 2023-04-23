import { useRef } from 'react';

function useThrottle(cb: () => void, limit: number) {
  const lastRun = useRef(Date.now());

  return function () {
    if (lastRun.current + limit < Date.now()) {
      cb();
      lastRun.current = Date.now();
    }
  };
}

export default useThrottle;
