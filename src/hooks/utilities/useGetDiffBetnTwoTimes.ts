import React from "react";
import { addSeconds, differenceInMinutes, differenceInSeconds, isValid } from "date-fns";
import { client_timezone, getConvertedDate } from "./useCountdown";

interface Params {
  targetDate: Date;
  initialDate: Date;
  calculateIn?: "minutes" | "seconds";
  calculate?: boolean;
}

export const useGetDiffBetnTwoTimes = ({
  targetDate,
  initialDate,
  calculateIn = "minutes",
  calculate = true,
}: Params) => {
  const [diffInTime, setDiffInTime] = React.useState<number | undefined>();
  const diffInMinsSetIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const [, setInitialDate] = React.useState<Date | number | undefined>();

  React.useEffect(() => {
    if (initialDate) {
      setInitialDate(new Date(initialDate));
    }
  }, [initialDate]);

  React.useEffect(() => {
    if (calculate) {
      diffInMinsSetIntervalRef.current = setInterval(() => {
        if (targetDate && initialDate) {
          let newInitialDate: Date | number | undefined;

          const _initialDate = getConvertedDate(initialDate, client_timezone);
          const _targetDate = getConvertedDate(targetDate, client_timezone);

          setInitialDate((prev) => {
            if (prev) {
              newInitialDate = addSeconds(prev, 1);
            } else {
              newInitialDate = _initialDate;
            }

            if (isValid(newInitialDate) && isValid(_targetDate)) {
              let diff: number;

              if (calculateIn === "minutes") {
                diff = differenceInMinutes(_targetDate, newInitialDate);
              } else {
                diff = differenceInSeconds(_targetDate, newInitialDate);
              }

              setDiffInTime(diff);

              if (diff < 0 && diffInMinsSetIntervalRef.current) {
                clearInterval(diffInMinsSetIntervalRef.current);
                diffInMinsSetIntervalRef.current = null;
              }
            }

            return newInitialDate;
          });
        }
      }, 1000);
    }

    return () => {
      if (diffInMinsSetIntervalRef.current) {
        clearInterval(diffInMinsSetIntervalRef.current);
      }
    };
  }, [targetDate, initialDate, calculateIn, calculate]);

  return diffInTime;
};
