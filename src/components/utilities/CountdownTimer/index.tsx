import { useEffect } from "react";
import { NavigateOptions, To, useNavigate } from "react-router-dom";

import { SxProps } from "@mui/material";

import "./styles.css";
import { useCountdown } from "@medlivery/hooks/useCountdown";
import { ShowCounter } from "./ShowCounter";

interface CountdownTimerProps {
  initialDate: Date;
  targetDate: Date;
  navigateUrl?: To;
  navigateOptions?: NavigateOptions;
  contentStyles?: SxProps;
  whenExpiredTimeCB?: () => void;
}

const CountdownTimer = ({
  initialDate,
  targetDate,
  navigateUrl,
  navigateOptions = {},
  whenExpiredTimeCB,
  contentStyles,
}: CountdownTimerProps) => {
  const navigate = useNavigate();
  const [days, hours, minutes, seconds] = useCountdown(targetDate, initialDate);

  useEffect(() => {
    if (parseInt(days + hours + minutes + seconds) <= 0) {
      navigateUrl && navigate(navigateUrl, navigateOptions);
      whenExpiredTimeCB?.();
    }
  }, [days, hours, minutes, seconds]);

  return (
    <ShowCounter
      days={days}
      hours={hours}
      minutes={minutes}
      seconds={seconds}
      contentStyles={contentStyles}
    />
  );
};

export default CountdownTimer;
