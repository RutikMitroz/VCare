import React from 'react'
import EnquiryDataCard from '../../ui/Cards/EnquiryDataCard'
import { Box } from '@mui/material'
function Sidebar() {
  return (
    <Box sx={{display: "flex",flexDirection: "column",gap: "12px"}}>
        <EnquiryDataCard text="Total Enquiries" quantity={351} color="#459CFF" />
        <EnquiryDataCard text="Quotation Sent" quantity={261} color="#60CA72" />
        <EnquiryDataCard text="Not Contacted" quantity={90} color="#FF0000" />
        <EnquiryDataCard text="Reminder" quantity={18} color="#1F1F1F" />
    </Box>
  )
}

export default Sidebar