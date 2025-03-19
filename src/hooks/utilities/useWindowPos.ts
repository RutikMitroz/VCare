import { useState, useEffect } from "react";

import throttle from "@medlivery/utils/throttle";

interface Dimensions {
  height: number;
  width: number;
}

export default function useWindowPos(dependencies: any[] = []) {
  const [dimensions, setDimensions] = useState<Dimensions | undefined>(undefined);

  useEffect(() => {
    if (document?.body) {
      setDimensions({
        height: document.body.clientHeight,
        width: document.body.clientWidth,
      });
    }
  }, []);

  useEffect(() => {
    const debouncedHandleResize = throttle(() => {
      if (document?.body) {
        setDimensions({
          height: document.body.clientHeight,
          width: document.body.clientWidth,
        });
      }
    }, 500);

    window.addEventListener("resize", debouncedHandleResize);

    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, dependencies);

  return { dimensions };
}
