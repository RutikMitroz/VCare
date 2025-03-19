import { Box } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

interface DashProps {
  rootStyles?: SxProps<Theme>;
}

export default function Dash({ rootStyles = {} }: DashProps) {
  return (
    <Box
      sx={{
        height: "5px",
        width: "50px",
        backgroundColor: "custom.blue_7",
        margin: ".75rem auto",
        ...rootStyles,
      }}
    ></Box>
  );
}
