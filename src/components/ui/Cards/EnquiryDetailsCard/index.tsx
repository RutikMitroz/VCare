import { Card, Typography, Box, IconButton, } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import { Colors } from "../../../../constants/Colors";

interface EnquiryDetailsCardProps {
    enquiryDetails: any;
}

const EnquiryDetailsCard = ({ enquiryDetails,Type }: EnquiryDetailsCardProps) => {
    return (
        <Card
            sx={{
                maxWidth: "400px",
                borderRadius: "12px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                padding: "16px",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ExpandMoreIcon
                        sx={{
                            color: Colors.primary,
                            marginRight: "8px",
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: "bold",
                            fontSize: "18px",
                            color: "#424242",
                        }}
                    >
                        {Type==="Complaint"?"Complaint Detail":"Enquiry Details"}
                    </Typography>
                </Box>
                <IconButton
                    sx={{
                        color: Colors.primary,
                    }}
                >
                    <EditIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            color: "#424242",
                            marginRight: "8px",
                        }}
                    >
                        •
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            color: Colors.primary,
                        }}
                    >
                        {Type==="Complaints"?enquiryDetails?.category||"":enquiryDetails?.enquiry_for||""}
                    </Typography>
                </Box>
                <Typography
                    sx={{
                        fontSize: "14px",
                        color: Colors.primary,
                        marginLeft: "20px",
                    }}
                >
                    {enquiryDetails?.enquiry_description||""}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PersonIcon
                        sx={{
                            color: Colors.primary,
                            fontSize: "18px",
                            marginRight: "8px",
                        }}
                    />
                    <Typography
                        sx={{
                            fontSize: "14px",
                            color: Colors.primary,
                        }}
                    >
                        {enquiryDetails?.assign_to?.user_name||""}
                    </Typography>
                </Box>
                <Typography
                    sx={{
                        fontSize: "14px",
                        color: Colors.primary,
                    }}
                >
                    {enquiryDetails?.date||""}
                </Typography>
            </Box>
        </Card>
    );
};

export default EnquiryDetailsCard;