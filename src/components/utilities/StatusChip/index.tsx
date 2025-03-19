import { Box, SxProps, Theme } from "@mui/material";
import React from "react";

interface ChipColorMapping {
  [key: string]: {
    bgcolor: string;
    fontColor?: string;
  };
}

interface StatusChipProps {
  startIcon?: React.ReactNode;
  label: string;
  chip_color_mappings?: ChipColorMapping;
  rootStyles?: SxProps<Theme>;
}

const StatusChip: React.FC<StatusChipProps> = ({
  startIcon,
  label,
  chip_color_mappings,
  rootStyles = {},
}) => {
  if (!label) return null;

  const lowerCaseLabel = label.toLowerCase();

  const backgroundColor =
    chip_color_mappings?.[lowerCaseLabel]?.bgcolor || "blue";

  const fontColor = chip_color_mappings?.[lowerCaseLabel]?.fontColor || "white";

  return (
    <Box
      component="p"
      sx={{
        fontSize: "1.2rem",
        backgroundColor,
        color: fontColor,
        padding: ".25rem .75rem",
        borderRadius: "5rem",
        width: "max-content",
        height: "max-content",
        display: "flex",
        alignItems: "center",
        gap: ".5rem",
        ...rootStyles,
      }}
    >
      {startIcon && startIcon}
      {label}
    </Box>
  );
};

export default StatusChip;
