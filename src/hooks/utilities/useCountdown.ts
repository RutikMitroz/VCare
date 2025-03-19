import { useEffect, useState, useRef } from "react";
import { addSeconds, parseISO } from "date-fns";

const client_timezone: string =
  Intl.DateTimeFormat().resolvedOptions().timeZone;

const getConvertedDate = (
  date: string | Date | undefined,
  client_timezone: string
): number => {
  return date && client_timezone
    ? new Date(
        new Date(date).toLocaleString("en-US", { timeZone: client_timezone })
      ).getTime()
    : new Date().getTime();
};

const getReturnValues = (
  countDown: number,
  stopWhenCountdownReachesZero: boolean
): [string, string, string, string] => {
  // Calculate time left
  const days = String(Math.floor(countDown / (1000 * 60 * 60 * 24))).padStart(
    2,
    "0"
  );
  const hours = String(
    Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  ).padStart(2, "0");

  const minutes = String(
    Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
  ).padStart(2, "0");

  const seconds = String(Math.floor((countDown % (1000 * 60)) / 1000)).padStart(
    2,
    "0"
  );

  if (
    stopWhenCountdownReachesZero &&
    parseInt(days + hours + minutes + seconds) <= 0
  ) {
    return ["00", "00", "00", "00"];
  }

  return [days, hours, minutes, seconds];
};

const useCountdown = (
  targetDate: string | Date,
  initialDate?: string | Date,
  stopWhenCountdownReachesZero: boolean = true
): [string, string, string, string] => {
  const [, setInitialDate] = useState<Date | undefined>();

  // 1. targetDate and initialDate are in server timezone
  // 2. targetDate is the date to count to
  // 3. initialDate is the date to count from

  const interval = useRef<NodeJS.Timeout | null>(null);

  const getDiff = (
    targetDate: string | Date,
    initialDate?: string | Date
  ): number => {
    return (
      getConvertedDate(targetDate, client_timezone) -
      getConvertedDate(initialDate, client_timezone)
    );
  };

  const [countDown, setCountDown] = useState<number>(
    getDiff(targetDate, initialDate)
  );

  useEffect(() => {
    interval.current = setInterval(() => {
      let newInitialDate: Date | undefined;

      if (initialDate) {
        setInitialDate((prev) => {
          if (prev) newInitialDate = addSeconds(prev, 1);
          else newInitialDate = addSeconds(parseISO(initialDate as string), 1);

          setCountDown(getDiff(targetDate, newInitialDate));

          return newInitialDate;
        });
      } else {
        setCountDown(getDiff(targetDate, newInitialDate));
      }
    }, 1000);

    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [countDown, initialDate, targetDate]);

  useEffect(() => {
    if (initialDate) {
      setInitialDate(new Date(initialDate));
    }
  }, [initialDate]);

  useEffect(() => {
    const [days, hours, minutes, seconds] = getReturnValues(
      countDown,
      stopWhenCountdownReachesZero
    );

    if (
      stopWhenCountdownReachesZero &&
      parseInt(days + hours + minutes + seconds) <= 0
    ) {
      if (interval.current) clearInterval(interval.current);
    }
  }, [...getReturnValues(countDown, stopWhenCountdownReachesZero)]);

  return getReturnValues(countDown, stopWhenCountdownReachesZero);
};

export { useCountdown, getConvertedDate, client_timezone };
