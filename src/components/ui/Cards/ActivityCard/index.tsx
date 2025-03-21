import { Box, Button, Card, Chip, Typography } from "@mui/material";

interface Activity {
    by: string;
    date: string;
    action: string;
    reminder: string | null;
}

const ActivityCard = () => {

    const activities: Activity[] = [
        {
            by: "Sales Team",
            date: "12th Jan 2025",
            action: "Quotation Sent",
            reminder: "Feb 1, 2025",
        },
        {
            by: "Sales Team",
            date: "12th Jan 2025",
            action: "Quotation Sent",
            reminder: null,
        },
        {
            by: "Sales Team",
            date: "12th Jan 2025",
            action: "Quotation Sent",
            reminder: null,
        },
        {
            by: "Sales Team",
            date: "12th Jan 2025",
            action: "Quotation Sent",
            reminder: null,
        },
    ];

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
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        color: "#424242",
                    }}
                >
                    Activity
                </Typography>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#1D434C",
                        color: "#FFFFFF",
                        textTransform: "Capitalize",
                        borderRadius: "10px",
                        fontSize: "14px",
                        fontWeight: "bold",
                        padding: "4px 36px",
                        "&:hover": {
                            backgroundColor: "#004D40",
                        },
                    }}
                >
                    Add Update
                </Button>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                {activities.map((activity, index) => (
                    <Box
                        key={index}
                        sx={{
                            border: "1px solid #E0E0E0",
                            borderRadius: "8px",
                            padding: "12px",
                            backgroundColor: "#FFFFFF",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "12px",
                                color: "#757575",
                                marginBottom: "4px",
                            }}
                        >
                            By {activity.by} on {activity.date}
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "14px",
                                color: "#00695C",
                                fontWeight: "bold",
                                marginBottom: activity.reminder ? "8px" : "0px",
                            }}
                        >
                            {activity.action}
                        </Typography>

                        {activity.reminder && (
                            <Chip
                                label={`Reminder for next - ${activity.reminder}`}
                                sx={{
                                    backgroundColor: "#FCE4EC",
                                    color: "#D81B60",
                                    fontSize: "12px",
                                    height: "24px",
                                    fontWeight: "bold",
                                }}
                            />
                        )}
                    </Box>
                ))}
            </Box>
        </Card>
    );
};

export default ActivityCard;