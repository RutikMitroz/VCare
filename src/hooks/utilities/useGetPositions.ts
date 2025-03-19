import { useRef, useState, useEffect } from "react";
import useWindowPos from "./useWindowPos";

interface Positions {
  width: number;
  height: number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  x: number;
  y: number;
}

export default function useGetPositions(dependencies: any[] = []) {
  const { dimensions } = useWindowPos();
  const posRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Positions | undefined>(undefined);

  useEffect(() => {
    setPositions(undefined);

    if (posRef.current) {
      const positions = posRef.current.getBoundingClientRect() as Positions;
      setPositions(positions);
    }

    return () => setPositions(undefined);
  }, [...dependencies, dimensions?.width]);

  return { posRef, positions, setPositions };
}
