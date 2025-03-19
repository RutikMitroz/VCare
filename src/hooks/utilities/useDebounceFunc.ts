import { useRef } from "react";

const useDebounce = (func: (...args: any[]) => void, wait: number) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return (...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      func(...args); // Execute the callback with the latest arguments
    }, wait);
  };
};

export default useDebounce;
