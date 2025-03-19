import { Suspense } from "react";

import Box from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material";

import SpinnerAdvGrid from "../SpinnerGrid";

interface LazyLoadingWrapperProps {
  rootStyles?: SxProps<Theme>;
  children: React.ReactNode;
}

const LazyLoadingWrapper = ({
  rootStyles = {},
  children,
}: LazyLoadingWrapperProps) => (
  <Box
    sx={{
      height: "100%",
      minHeight: "10rem",
      position: "relative",
      ...rootStyles,
    }}
  >
    <Suspense fallback={<SpinnerAdvGrid />}>{children}</Suspense>
  </Box>
);

export default LazyLoadingWrapper;
