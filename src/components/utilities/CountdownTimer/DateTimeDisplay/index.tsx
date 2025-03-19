import { Box, SxProps } from "@mui/material";

interface DateTimeDisplayProps {
  value: string;
  isDanger: boolean;
  type: "Days" | "Hours" | "Mins" | "Seconds";
  contentStyles?: SxProps;
}

const DateTimeDisplay = ({
  value,
  type,
  isDanger,
  contentStyles = {},
}: DateTimeDisplayProps) => {
  return (
    <Box className={isDanger ? "countdown danger" : "countdown"}>
      <Box component="p" sx={{ ...contentStyles }}>
        {value}
      </Box>
      <Box component="span" sx={{ ...contentStyles }}>
        {type}
      </Box>
    </Box>
  );
};

export default DateTimeDisplay;
