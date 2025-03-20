import React from "react";
import Sidebar from "./Sidebar";
import { Box, Button } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import DataTable from "./DataTable";


// import { InputField } from "@medlivery/vulkan-ui";

const RenderEnquiry = () => {
  return (
    <Box sx={{ display: "flex", gap: "2rem", justifyContent: "space-between" ,p: "2rem"}}>
      <Box sx={{width: "25%"}}>
        <Sidebar />
      </Box>
      <Box>
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
            size="small"
            sx={{
              width: '30%',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                height: '2.5rem',
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
              backgroundColor: '#00695C',
              color: '#FFFFFF',
              borderRadius: '8px',
              padding: '6px 12px',
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
