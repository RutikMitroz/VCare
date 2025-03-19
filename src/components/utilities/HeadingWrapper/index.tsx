import { ChevronLeft } from "lucide-react";

import { Box, SxProps, Theme } from "@mui/material";

import { Button } from "@medlivery/vulkan-ui";
import { useNavigate } from "react-router-dom";

interface HeadingWrapperProps {
  rootStyles?: SxProps<Theme>;
  navigateUrl?: string;
  heading: string;
  showBackButton?: boolean;
}

const HeadingWrapper = ({
  heading,
  navigateUrl,
  rootStyles = {},
  showBackButton = true,
}: HeadingWrapperProps) => {
  const navigate = useNavigate();

  return (
    <Box className="flex items-center gap-3">
      {showBackButton && (
        <Button
          size="icon"
          variant="outline"
          tooltipTitle="Go back"
          onClick={() => (navigateUrl ? navigate(navigateUrl) : navigate(-1))}
        >
          <ChevronLeft />
        </Button>
      )}

      <Box
        sx={{
          fontSize: "2.1rem",
          display: "flex",
          alignItems: "center",
          fontWeight: 600,
          height: "4rem",
          flex: 1,

          "&:after": {
            display: "block",
            content: '""',
            height: "1px !important",
            flex: 1,
            bgcolor: "custom.blue_4",
            marginLeft: "1rem",
          },

          ...rootStyles,
        }}
      >
        {heading}
      </Box>
    </Box>
  );
};

export default HeadingWrapper;
