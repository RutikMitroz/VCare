import { Card, Typography, Box, Link, } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Colors } from "../../../../constants/Colors";

interface ClientDetailsCardProps {
    clientDetails: any;
}

const ClientDetailsCard = ({ clientDetails }: ClientDetailsCardProps) => {
    console.log("clientDetails", clientDetails);
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
                    marginBottom: "16px",
                }}
            >
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
                    Client Details
                </Typography>
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
                            minWidth: "100px",
                        }}
                    >
                        Client Name :
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "14px",
                            color: Colors.primary,
                        }}
                    >
                        {clientDetails?.client_name}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            color: "#424242",
                            minWidth: "100px",
                        }}
                    >
                        Contact No :
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "14px",
                            color: Colors.primary,
                        }}
                    >
                        {clientDetails?.client_phone}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            color: "#424242",
                            minWidth: "100px",
                        }}
                    >
                        Mail ID :
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "14px",
                            color: Colors.primary,
                        }}
                    >
                        {clientDetails?.client_email}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            color: "#424242",
                            minWidth: "100px",
                        }}
                    >
                        Address :
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: "14px",
                            color: Colors.primary,
                            lineHeight: "1.5",
                        }}
                    >
                        {clientDetails?.client_address}
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LocationOnIcon
                        sx={{
                            color: Colors.primary,
                            fontSize: "18px",
                            marginRight: "8px",
                        }}
                    />
                    <Link
                        href="https://maps.app.goo.gl/Da1D0mX8Tn45mWs6"
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            fontSize: "14px",
                            color: Colors.primary,
                            textDecoration: "underline",
                            "&:hover": {
                                color: "#004D40", 
                            },
                            wordBreak: "break-all", 
                            overflowWrap: "break-word", 
                            maxWidth: "calc(100% - 26px)", 
                        }}
                    >
                        https://maps.app.goo.gl/Da1D0mX8Tn45mWs6
                    </Link>
                </Box>
            </Box>
        </Card>
    );
};

export default ClientDetailsCard;