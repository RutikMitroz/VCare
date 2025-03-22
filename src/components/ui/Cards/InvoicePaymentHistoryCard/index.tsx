import { Box, Typography } from "@mui/material";

// interface Payment {
//     date: string;
//     paidAmount: string;
// }

// interface HistoryProps {
//     paymentHistory: Payment[];
// }

const paymentHistory = [
    { date: "14 March 2025", paidAmount: "₹10,000/-" },
    { date: "03 March 2025", paidAmount: "₹5,000/-" },
];

const InvoicePaymentHistoryCard = () => {
    return (
        <Box sx={{ mb: 3 }}>
            <Typography
                sx={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#424242",
                    mb: 2,
                }}
            >
                History
            </Typography>
            <Box>
                {paymentHistory.length > 0 ? (
                    paymentHistory.map((payment, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                bgcolor: "white",
                                borderRadius: "8px",
                                padding: "12px 16px",
                                mb: index < paymentHistory.length - 1 ? 1 : 0,
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    color: "#424242",
                                }}
                            >
                                {payment.date}
                            </Typography>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                                <Typography sx={{
                                    fontSize: 14,
                                    color: "#4398D3",
                                }}>Paid </Typography>
                                <Typography
                                    sx={{
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        color: "#424242",
                                    }}
                                >
                                    {payment.paidAmount}
                                </Typography>
                            </Box>
                        </Box>
                    ))
                ) : (
                    <Typography
                        sx={{
                            fontSize: 14,
                            color: "#424242",
                        }}
                    >
                        No payment history available
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default InvoicePaymentHistoryCard;