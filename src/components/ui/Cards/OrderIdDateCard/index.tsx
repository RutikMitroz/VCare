import React from 'react';
import { Box, Typography } from '@mui/material';

interface OrderIdDateCardProps {
  label: string;
  value: string;
  isBlue?: boolean;
}

const OrderIdDateCard: React.FC<OrderIdDateCardProps> = ({ label, value, isBlue = false }) => {
  return (
    <Box sx={{backgroundColor:"white",px:2,pr:5,borderRadius:2,py:1,border:"1px solid #E2E8F0",cursor:"pointer"}}>
      <Typography color="text.secondary" variant="body2" sx={{fontSize:"16px",fontWeight:"800"}}>
        {label}
      </Typography>
      <Typography 
        variant="body1" 
        sx={{ 
          color: isBlue ? "#4398D3" : "inherit",
          fontWeight: isBlue ? 500 : 400,
          fontSize:"16px"
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default OrderIdDateCard;
