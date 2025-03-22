import { Box, Typography } from "@mui/material";

// interface PaymentSummary {
//   date: string;
//   totalBill: string;
//   totalPaid: string;
//   remainingAmount: string;
// }

const paymentSummary = {
    date: "14 March 2025",
    totalBill: "₹ 45,000/-",
    totalPaid: "₹ 15,000/-",
    remainingAmount: "₹ 30,000/-",
};

// interface PaymentsProps {
//   paymentSummary: PaymentSummary;
// }

const InvoicePaymentCard = () => {
    return (
        <Box sx={{ my: 6 }}>
            <Typography
                sx={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#424242",
                    mb: 2,
                }}
            >
                Payments
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    bgcolor: "white",
                    borderRadius: "8px",
                    padding: "16px 20px",
                }}
            >
                <Box>
                    <Typography
                        sx={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#424242",
                            mb: 3,
                        }}
                    >
                        {paymentSummary.date}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: 14,
                            color: "#4398D3",
                        }}
                    >
                        Total Bill <Typography sx={{
                            fontSize: 16,
                            fontWeight: "bold",
                            color: "#424242",
                        }}>{paymentSummary.totalBill}</Typography>
                    </Typography>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                    <Box sx={{ display: "flex",justifyContent: "space-between" }}>
                        <Typography sx={{
                            fontSize: 14, color: "#4398D3",
                        }}>Total Paid</Typography>
                        <Typography
                            sx={{
                                fontSize: 16,
                                color: "#2E7D32",
                                fontWeight: "bold",
                                mb: 3,
                            }}
                        >
                            {paymentSummary.totalPaid}
                        </Typography>
                    </Box>
                    <Box sx={{ display: "flex",justifyContent: "space-between" }}>
                        <Typography sx={{
                            fontSize: 14, color: "#4398D3",
                        }}>Remaining Amt</Typography>
                        <Typography
                            sx={{
                                fontSize: 16,
                                color: "#D32F2F",
                                fontWeight: "bold",
                            }}
                        >
                            {paymentSummary.remainingAmount}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default InvoicePaymentCard;