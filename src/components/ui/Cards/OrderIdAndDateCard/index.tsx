import { Box, Typography } from '@mui/material';
import React from 'react'

interface OrderIdAndDateCardProps {
  label: string;
  value: string
}

const OrderIdAndDateCard: React.FC<OrderIdAndDateCardProps> = ({ label, value }) => {
  return (
    <Box sx={{ backgroundColor: "white", paddingLeft: 2, paddingRight: 8, paddingY: 1, borderRadius: 3, border: "1px solid #E0E0E0" }}>
      <Typography sx={{ textAlign: "left", fontWeight: "bold", fontSize: 14 }}>{label}</Typography>
      <Typography sx={{ textAlign: "left", color: "#4398D3", fontSize: 12 }}>{value}</Typography>
    </Box>
  )
}

export default OrderIdAndDateCard