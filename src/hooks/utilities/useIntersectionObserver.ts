import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (options: {}, dependencies: any[]) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [targetRef, options, ...dependencies]);

  return { targetRef, isIntersecting };
};

export default useIntersectionObserver;
