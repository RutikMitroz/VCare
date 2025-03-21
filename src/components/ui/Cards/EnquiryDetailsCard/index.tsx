import { Card, Typography, Box, IconButton, } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";

const EnquiryDetailsCard = () => {
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
                            color: "#00695C",
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
                        Enquiry Details
                    </Typography>
                </Box>
                <IconButton
                    sx={{
                        color: "#00695C",
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
                            color: "#00695C",
                        }}
                    >
                        CCTV
                    </Typography>
                </Box>
                <Typography
                    sx={{
                        fontSize: "14px",
                        color: "#00695C",
                        marginLeft: "20px",
                    }}
                >
                    ENQUIRY for 3 New CCTV Installation
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PersonIcon
                        sx={{
                            color: "#00695C",
                            fontSize: "18px",
                            marginRight: "8px",
                        }}
                    />
                    <Typography
                        sx={{
                            fontSize: "14px",
                            color: "#00695C",
                        }}
                    >
                        Amit Kumar
                    </Typography>
                </Box>
                <Typography
                    sx={{
                        fontSize: "14px",
                        color: "#00695C",
                        marginLeft: "32px",
                    }}
                >
                    12/02/2025
                </Typography>
            </Box>
        </Card>
    );
};

export default EnquiryDetailsCard;