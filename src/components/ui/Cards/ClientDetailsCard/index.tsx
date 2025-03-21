import { Card, Typography, Box, Link, } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const ClientDetailsCard = () => {
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
                            color: "#00695C",
                        }}
                    >
                        Sarah Johnson
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
                            color: "#00695C",
                        }}
                    >
                        +91 98989885258
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
                            color: "#00695C",
                        }}
                    >
                        sarahjohnsan@gmail.com
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
                            color: "#00695C",
                            lineHeight: "1.5",
                        }}
                    >
                        101, Business Plaza, Andheri East
                        <br />
                        Mumbai, Maharashtra - 400059
                        <br />
                        India
                    </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <LocationOnIcon
                        sx={{
                            color: "#00695C",
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
                            color: "#00695C",
                            textDecoration: "underline",
                            "&:hover": {
                                color: "#004D40", // Darker teal on hover
                            },
                            wordBreak: "break-all", // Break long words/URLs to wrap to the next line
                            overflowWrap: "break-word", // Ensure wrapping for long text
                            maxWidth: "calc(100% - 26px)", // Adjust width to account for the icon (18px icon + 8px margin)
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