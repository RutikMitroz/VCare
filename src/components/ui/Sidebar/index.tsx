import { useState } from 'react';
import EnquiryDataCard from '../Cards/EnquiryDataCard'
import { Box, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface SidebarProps {
  summary: any;
}

function Sidebar({ summary }: SidebarProps) {
  const [timeFilter, setTimeFilter] = useState('This Month');

  const handleTimeFilterChange = (event: SelectChangeEvent) => {
    setTimeFilter(event.target.value);
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
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
      <EnquiryDataCard text="Total Enquiries" quantity={summary?.totalEnquiries} color="#459CFF" />
      <EnquiryDataCard text="Quotation Sent" quantity={summary?.quotation_sent} color="#60CA72" />
      <EnquiryDataCard text="Not Contacted" quantity={summary?.not_contacted} color="#FF0000" />
      <EnquiryDataCard text="Reminder" quantity={summary?.remainder} color="#1F1F1F" />
    </Box>
  )
}

export default Sidebar;