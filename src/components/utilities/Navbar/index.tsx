import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { menuItems } from '../../../constants/menuItems.tsx';
import { useNavigate, useLocation } from 'react-router-dom';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mastersAnchorEl, setMastersAnchorEl] = React.useState<null | HTMLElement>(null);

  // Find the menu item that matches the current path
  const getCurrentMenuItem = () => {
    const currentPath = location.pathname;
    // Handle root path
    if (currentPath === '/') {
      return 'Dashboard';
    }
    // Check if current path is a submenu item
    const masterSubItem = menuItems
      .find(item => item.subItems)
      ?.subItems?.find(subItem => currentPath === subItem.path);
    if (masterSubItem) {
      return 'Masters';
    }
    const currentItem = menuItems.find(item => item.path === currentPath);
    return currentItem ? currentItem.text : 'Dashboard';
  };

  const handleMastersClick = (event: React.MouseEvent<HTMLElement>, item: typeof menuItems[0]) => {
    if (item.subItems) {
      event.stopPropagation();
      setMastersAnchorEl(event.currentTarget);
    } else {
      navigate(item.path);
    }
  };

  const handleMastersClose = () => {
    setMastersAnchorEl(null);
  };

  const handleSubItemClick = (path: string) => {
    navigate(path);
    handleMastersClose();
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
            onClick={(e) => handleMastersClick(e, item)}
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
            {item.subItems && (
              <KeyboardArrowDownIcon 
                sx={{ 
                  ml: 0.5, 
                  fontSize: '18px',
                  color: getCurrentMenuItem() === item.text ? '#60CA72' : 'inherit',
                }} 
              />
            )}
          </Box>
        ))}

        <Menu
          anchorEl={mastersAnchorEl}
          open={Boolean(mastersAnchorEl)}
          onClose={handleMastersClose}
          sx={{
            '& .MuiPaper-root': {
              backgroundColor: '#1D434C',
              color: 'white',
              mt: 1,
            }
          }}
        >
          {menuItems
            .find(item => item.text === 'Masters')
            ?.subItems?.map((subItem, index) => (
              <MenuItem 
                key={index}
                onClick={() => handleSubItemClick(subItem.path)}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: '32px' }}>
                  {subItem.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={subItem.text}
                  primaryTypographyProps={{
                    fontSize: '13px'
                  }}
                />
              </MenuItem>
            ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;