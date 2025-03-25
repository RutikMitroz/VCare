import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../ui/Sidebar";

const RenderInventory = () => {
  const summary = [
    {
      text: "Total Items",
      value: 360,
      color: "#459CFF",
    }
  ];
  return (
    <Box sx={{ display: "flex", gap: "2rem", justifyContent: "space-between" }}>
      <Box
        sx={{
          width: "25%",
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "16px",
          border: "2px solid #E0E0E0",
        }}
      >
        <Sidebar summary={summary} />
      </Box>
      <Box sx={{ width: "75%",backgroundColor:"red" }}></Box>
    </Box>
  );
};

export default RenderInventory;
