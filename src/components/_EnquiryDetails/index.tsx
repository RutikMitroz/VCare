import { Box, Button, Typography } from "@mui/material";
import ClientDetailsCard from "../ui/Cards/ClientDetailsCard";
import EnquiryDetailsCard from "../ui/Cards/EnquiryDetailsCard";
import ActivityCard from "../ui/Cards/ActivityCard";
import ProgressBar from "../ui/ProgressBar";
import DataTable from "./DataTable";

const RenderEnquiryDetails = () => {

    return (
        <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
            <Box sx={{ width: "20%", display: "flex", flexDirection: "column", gap: 2 }}>
                <ClientDetailsCard />
                <EnquiryDetailsCard />
            </Box>
            <Box sx={{ width: "60%", display: "flex", flexDirection: "column", gap: 2 }}>
                <ProgressBar />
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <Typography sx={{ fontSize: 18, fontWeight: "bold" }} >Quotations</Typography>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#1D434C',
                            color: '#FFFFFF',
                            borderRadius: '8px',
                            padding: '16px 22px',
                            textTransform: 'capitalize',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            height: '2.5rem',
                            '&:hover': {
                                backgroundColor: '#004D40',
                            },
                        }}
                    >
                        Create Quotation

                    </Button>
                </Box>
                <DataTable />
            </Box>
            <Box sx={{ width: "20%" }}>
                <ActivityCard />
            </Box>
        </Box>
    );
};

export default RenderEnquiryDetails;
