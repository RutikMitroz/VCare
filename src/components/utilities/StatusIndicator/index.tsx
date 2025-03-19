import Box from "@mui/material/Box";

const StatusIndicator = ({ status }: { status: boolean }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "max-content",
        margin: "auto",
      }}
    >
      <Box
        sx={{
          width: "1rem",
          height: "1rem",
          borderRadius: "50%",
          backgroundColor: status ? "#70D486" : "red",
          margin: "auto",
        }}
      />
      <Box sx={{ fontSize: 14, marginLeft: ".5rem" }}>
        {status ? "Active" : "Inactive"}
      </Box>
    </Box>
  );
};

export default StatusIndicator;
