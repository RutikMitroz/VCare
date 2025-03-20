import { Box, Typography } from "@mui/material";
import React from "react";

interface EnquiryDataCardProps {
  text: string;
  color: string;
  quantity: number;
}

function EnquiryDataCard({ text, quantity, color }: EnquiryDataCardProps) {
  return (
    <Box 
      sx={{ 
        width: "100%", 
        backgroundColor: "#EEF3F6",
        padding: "16px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        transition: "all 0.3s ease",
        cursor: "pointer",

      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: "34px",
          fontWeight: "600",
          color: color,
          lineHeight: "1",
        }}
      >
        {quantity}
      </Typography>
      <Typography
        sx={{
          mt: "10px",
          fontSize: "18px",
          fontWeight: "800",
          color: "black"
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}

export default EnquiryDataCard;
