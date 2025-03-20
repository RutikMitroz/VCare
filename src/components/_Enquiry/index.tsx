import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Box, Button, FormControl, Select, MenuItem, SelectChangeEvent } from "@mui/material";
// import { InputField } from "@medlivery/vulkan-ui";
import AddIcon from "@mui/icons-material/Add";
import Input from "../utilities/InputField";

const RenderEnquiry = () => {
  const [timeFilter, setTimeFilter] = useState('This Month');

  const handleTimeFilterChange = (event: SelectChangeEvent) => {
    setTimeFilter(event.target.value);
  };

  return (
    <Box sx={{ display: "flex", gap: "2rem", justifyContent: "space-between" ,p: "2rem"}}>
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
      <Box>
        <Box
          sx={{
            margin: ".5rem 0 1rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "4.5rem",
          }}
        >
          <div className="w-[25rem]">
            <Input
              placeholder="Search tests..."
              // value={query}
              // endIcon={searchParams.get("q") ? <X /> : null}
              // onEndIconClick={() => handleSearch("")}
              // onChange={(e) => {
              //   setQuery(e.target.value);
              //   debouncedSearch(e.target.value);
              // }}
            />
          </div>
          <Button
            size="small"
            variant="contained"
            sx={{ textTransform: "capitalize", textAlign: "center" }}
          >
            {" "}
            <AddIcon /> Add Enquiry{" "}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default RenderEnquiry;
