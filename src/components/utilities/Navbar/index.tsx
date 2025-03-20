import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { menuItems } from '../../../constants/menuItems.tsx';

const Navbar = () => {
  const [selectedItem, setSelectedItem] = useState('Enquiry'); // Default selected item

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: '#1D434C', 
        top: '64px',
        minHeight: '55px',
      }}
    >
      <Toolbar 
        sx={{ 
          minHeight: '55px !important',
          padding: '0 16px',
        }}
      >
        {menuItems.map((item, index) => (
          <Box
            key={index}
            onClick={() => setSelectedItem(item.text)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mx: 1,
              cursor: 'pointer',
              padding: '6px 12px',
              borderRadius: '24px',
              backgroundColor: selectedItem === item.text ? '#0A2732' : 'transparent',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: selectedItem === item.text ? '#0A2732' : 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <IconButton 
              color="inherit" 
              size="small"
              sx={{ 
                color: selectedItem === item.text ? '#60CA72' : 'inherit',
                padding: '2px',
                '& .MuiSvgIcon-root': {
                  fontSize: '16px',
                }
              }}
            >
              {item.icon}
            </IconButton>
            <Typography
              variant="body2"
              sx={{
                ml: 0.5,
                whiteSpace: 'nowrap',
                fontSize: '13px',
                opacity: selectedItem === item.text ? 1 : 0.85,
                color: selectedItem === item.text ? '#60CA72' : 'inherit',
              }}
            >
              {item.text}
            </Typography>
          </Box>
        ))}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;