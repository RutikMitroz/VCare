import React, { useState } from "react";
import Sidebar from "./Sidebar";

import { Box, Button, FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material";


import AddIcon from '@mui/icons-material/Add';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DataTable from "./DataTable";

// import { InputField } from "@medlivery/vulkan-ui";

const RenderEnquiry = () => {
  const [timeFilter, setTimeFilter] = useState('This Month');

  const handleTimeFilterChange = (event: SelectChangeEvent) => {
    setTimeFilter(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", gap: "2rem", justifyContent: "space-between" }}>
      <Box sx={{width: "25%",backgroundColor:"white",borderRadius:"16px",padding:"16px",border:"2px solid #E0E0E0"}}>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Select
            value={timeFilter}
            onChange={handleTimeFilterChange}
            sx={{
              backgroundColor: 'white',
              '.MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.1)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.2)',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'rgba(0, 0, 0, 0.2)',
              },
              fontSize: '14px',
              color: '#333',
            }}
          >
            <MenuItem value="This Week">This Week</MenuItem>
            <MenuItem value="This Month">This Month</MenuItem>
            <MenuItem value="This Year">This Year</MenuItem>
          </Select>
        </FormControl>
        <Sidebar />
      </Box>
      <Box sx={{width: "75%"}}>
        <Box
          sx={{
            margin: '0.5rem 0 1rem 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TextField
            placeholder="Search"
            variant="outlined"
            sx={{
              width: '30%',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                height: '3.2rem',
                '& fieldset': {
                  borderColor: '#E0E0E0',
                },
                '&:hover fieldset': {
                  borderColor: '#B0BEC5',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00695C',
                },
              },
              '& .MuiInputBase-input': {
                padding: '8px 14px',
                color: '#B0BEC5',
                fontSize: '14px',
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#B0BEC5',
                opacity: 1,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#B0BEC5', fontSize: '20px' }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon sx={{ fontSize: '16px' }} />}
            sx={{
              backgroundColor: '#1D434C',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '16px 16px',
              textTransform: 'capitalize',
              fontWeight: 'bold',
              fontSize: '14px',
              height: '2.5rem',
              '&:hover': {
                backgroundColor: '#004D40',
              },
            }}
          >
            Add Enquiry

          </Button>
        </Box>
        <DataTable
          appointments={[]}
          page={1}
          rowsPerPage={10}
          totalNoOfDocs={10}
          handleChangePage={() => { }}
          handleChangeRowsPerPage={() => { }}
        />
      </Box>
    </Box>
  );
};

export default RenderEnquiry;
