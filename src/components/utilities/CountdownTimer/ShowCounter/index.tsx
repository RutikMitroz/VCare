import { Box, SxProps } from "@mui/material";

import DateTimeDisplay from "../DateTimeDisplay";

interface ShowCounterProps {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  contentStyles?: SxProps;
}

export const ShowCounter = ({
  days,
  hours,
  minutes,
  seconds,
  contentStyles,
}: ShowCounterProps) => {
  return (
    <Box className="show-counter">
      <a className="countdown-link">
        <DateTimeDisplay
          value={days}
          type={"Days"}
          isDanger={parseInt(days) <= 3}
          contentStyles={contentStyles}
        />
        <p>:</p>
        <DateTimeDisplay
          value={hours}
          type={"Hours"}
          isDanger={parseInt(days + hours) == 0 ? true : false}
          contentStyles={contentStyles}
        />
        <p>:</p>
        <DateTimeDisplay
          value={minutes}
          type={"Mins"}
          isDanger={parseInt(days + hours + minutes) == 0 ? true : false}
          contentStyles={contentStyles}
        />
        <p>:</p>
        <DateTimeDisplay
          value={seconds}
          type={"Seconds"}
          isDanger={
            parseInt(days + hours + minutes + seconds) <= 0 ? true : false
          }
          contentStyles={contentStyles}
        />
      </a>
    </Box>
  );
};
