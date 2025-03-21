import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { menuItems } from '../../../constants/menuItems.tsx';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Find the menu item that matches the current path
  const getCurrentMenuItem = () => {
    const currentPath = location.pathname;
    // Handle root path
    if (currentPath === '/') {
      return 'Dashboard';
    }
    const currentItem = menuItems.find(item => item.path === currentPath);
    return currentItem ? currentItem.text : 'Dashboard';
  };


  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        backgroundColor: '#1D434C', 
        top: '48px',
        minHeight: '48px',
      }}
    >
      <Toolbar 
        sx={{ 
          minHeight: '48px !important',
          padding: '0 16px',
        }}
      >
        {menuItems.map((item, index) => (
          <Box
            key={index}
            onClick={() => navigate(item.path)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mx: 1,
              cursor: 'pointer',
              padding: '6px 12px',
              borderRadius: '24px',
              backgroundColor: getCurrentMenuItem() === item.text ? '#0A2732' : 'transparent',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: getCurrentMenuItem() === item.text ? '#0A2732' : 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            <IconButton 
              color="inherit" 
              size="small"
              sx={{ 
                color: getCurrentMenuItem() === item.text ? '#60CA72' : 'inherit',
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
                opacity: getCurrentMenuItem() === item.text ? 1 : 0.85,
                color: getCurrentMenuItem() === item.text ? '#60CA72' : 'inherit',
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