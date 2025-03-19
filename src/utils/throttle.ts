type ThrottleFunction<T extends (...args: any[]) => void> = (
  fn: T,
  wait?: number
) => (...args: Parameters<T>) => void;

const throttle: ThrottleFunction<(...args: any[]) => void> = (
  fn,
  wait = 500
) => {
  let lastTime = 0;

  return function (...args: any[]) {
    const now = Date.now();
    if (now - lastTime >= wait) {
      fn(...args);
      lastTime = now;
    }
  };
};

export default throttle;
