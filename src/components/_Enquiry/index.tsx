import React from "react";
import Sidebar from "./Sidebar";
import { Box, Container } from "@mui/material";

const _Enquiry = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#EEF3F6",
        m:0,
        p:5
      }}
    >
      <Box
        sx={{
          width: "20%",
          minWidth: "280px",
          backgroundColor: "white",
          padding: "24px",
          borderRight: "1px solid rgba(0, 0, 0, 0.12)",
          height: "100vh",
          overflowY: "auto",
          borderRadius: "12px",
        }}
      >
        <Sidebar />
      </Box>
      <Box
        sx={{
          flex: 1,
          padding: "24px",
          overflowY: "auto",
        }}
      >
        Table
      </Box>
    </Box>
  );
};

export default _Enquiry;
