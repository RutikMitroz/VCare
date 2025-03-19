import clsx from "clsx";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const FetchingDataSpinner = ({
  msg = "Loading...",
  spinnerSize = "40px",
  customClassName = "",
  rootStyles = {},
}) => {
  return (
    <Box
      className={clsx(customClassName)}
      sx={{
        display: "flex",
        alignItems: "center",
        width: "max-content",
        margin: "auto",
        padding: "1rem",
        ...rootStyles,
      }}
    >
      <CircularProgress sx={{ width: spinnerSize, height: spinnerSize }} />
      <Box sx={{ fontSize: "15px", marginLeft: "1rem" }}>{msg}</Box>
    </Box>
  );
};

export default FetchingDataSpinner;
