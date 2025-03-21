import { useState } from "react";
import {
  Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TextField, IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// interface UpdatePaymentsProps {
//   remainingAmount: string;
//   onAddPayment: (paidAmount: string) => void;
// }

const InvoiceUpdatePaymentCard = () => {
  const [paidAmount, setPaidAmount] = useState<string>("");

  const handleAdd = () => {
    if (!paidAmount || isNaN(parseFloat(paidAmount))) {
      alert("Please enter a valid payment amount.");
      return;
    }

    const paid = 1000;
    // const paid = parseFloat(paidAmount);
    const remaining = 120;
    // const remaining = parseFloat(remainingAmount.replace(/[^0-9.-]+/g, ""));
    if (paid > remaining) {
      alert("Payment amount cannot exceed the remaining amount.");
      return;
    }

    // onAddPayment(paidAmount);
    setPaidAmount(""); // Clear the input after adding
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        sx={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#424242",
          mb: 1,
        }}
      >
        Update Payments
      </Typography>

      <TableContainer sx={{ bgcolor: "#FFFFFF", borderRadius: 2 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "#1D434C" }}>
              {["Sr. No.", "Paid Amount", "Remaining Amount", "Action"].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    color: "#FFFFFF",
                    fontSize: "14px",
                    textTransform: "capitalize",
                    fontWeight: "bold",
                    padding: "12px",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell sx={{ padding: "8px" }}>#</TableCell>
              <TableCell sx={{ padding: "8px" }}>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  value={paidAmount}
                  onChange={(e) => setPaidAmount(e.target.value)}
                  sx={{
                    "& .MuiInputBase-root": {
                      fontSize: "14px",
                      borderRadius: "8px",
                    },
                  }}
                />
              </TableCell>
              <TableCell sx={{ padding: "8px" }}>4500</TableCell>
              <TableCell sx={{ padding: "8px" }}>
                <IconButton
                  onClick={handleAdd}
                  sx={{
                    backgroundColor: "#2196F3",
                    color: "#FFFFFF",
                    "&:hover": {
                      backgroundColor: "#1976D2",
                    },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InvoiceUpdatePaymentCard;