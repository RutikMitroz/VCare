import { Table, TableCell, TableContainer, TableHead, TableRow, Box, TableBody, IconButton, Typography, Button, } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import InvoicePaymentCard from "../../../ui/Cards/InvoicePaymentCard";
import InvoiceUpdatePaymentCard from "../../../ui/Cards/InvoiceUpdatePaymentCard";
import InvoicePaymentHistoryCard from "../../../ui/Cards/InvoicePaymentHistoryCard";
import { Colors } from "../../../../constants/Colors";

interface invoice {
    invoiceId: string;
    createDate: string;
    createdBy: string;
    amount: string;
}

interface DataTableProps {
    setFlag: (isCreating: boolean) => void;
}

const DataTable: React.FC<DataTableProps> = ({ setFlag }) => {

    const invoices: invoice[] = [
        {
            invoiceId: "25/02/QT00018",
            createDate: "12/01/2025",
            createdBy: "Amit Kumar",
            amount: "14390",
        }
    ];

    const headerCellStyle = {
        backgroundColor: Colors.primary,
        color: "#FFFFFF",
        fontSize: "14px",
        textTransform: "Capitalize",
        borderBottom: "1px solid #E0E0E0",
        padding: "12px",
        position: "sticky",
        top: 0,
        zIndex: 1,
    } as const;

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Typography sx={{ fontSize: 18, fontWeight: "bold" }} >Invoice</Typography>
                <Button
                    onClick={() => setFlag(false)}
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
                    Create Invoice

                </Button>
            </Box>
            <Box
                className="border border-border border-solid rounded-md overflow-hidden"
                sx={{ overflowX: "auto", width: "100%" }}
            >
                <TableContainer
                    sx={{
                        maxHeight: "500px",
                        position: "relative",
                    }}
                >
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align="center"
                                    sx={{
                                        ...headerCellStyle,
                                        borderTopLeftRadius: "12px",
                                    }}
                                >
                                    invoice Id
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Create Date
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Created By
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Bill Amount
                                </TableCell>
                                <TableCell
                                    align="center"
                                    sx={{
                                        ...headerCellStyle,
                                        borderTopRightRadius: "12px",
                                    }}
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoices.length > 0 ? (
                                invoices.map((row, index) => (
                                    <TableRow
                                        key={row.invoiceId}
                                        sx={{
                                            backgroundColor: index % 2 === 0 ? "#F5F7FA" : "#FFFFFF",
                                            "&:hover": {
                                                backgroundColor: "#E8F0FE",
                                            },
                                            "& .MuiTableCell-root": {
                                                fontSize: "14px",
                                                color: "#424242",
                                                borderBottom: "1px solid #E0E0E0",
                                                padding: "12px",
                                            },
                                        }}
                                    >
                                        <TableCell align="center">{row.invoiceId}</TableCell>
                                        <TableCell align="center">{row.createDate}</TableCell>
                                        <TableCell align="center">{row.createdBy}</TableCell>
                                        <TableCell align="center">{row.amount}</TableCell>
                                        <TableCell align="center">
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                                <IconButton
                                                    sx={{
                                                        color: "#424242",
                                                        "&:hover": {
                                                            color: Colors.primary,
                                                        },
                                                    }}
                                                >
                                                    <PrintIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    sx={{
                                                        color: "#424242",
                                                        "&:hover": {
                                                            color: Colors.primary,
                                                        },
                                                    }}
                                                >
                                                    <VisibilityIcon sx={{ color: "#4398D3" }} fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    sx={{
                                                        color: "#424242",
                                                        "&:hover": {
                                                            color: Colors.primary,
                                                        },
                                                    }}
                                                >
                                                    <ShareIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No data available
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ display: "flex", justifyContent: "center", gap: 4, marginTop: "24px" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            backgroundColor: Colors.primary,
                            color: "#FFFFFF",
                            borderRadius: "8px",
                            padding: "6px 38px",
                            textTransform: "capitalize",
                            fontSize: "14px",
                            fontWeight: "bold",
                            "&:hover": {
                                backgroundColor: "#004D40",
                            },
                        }}
                    >
                        Save
                    </Button>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#E0E0E0",
                            color: "#424242",
                            borderRadius: "8px",
                            padding: "6px 38px",
                            textTransform: "capitalize",
                            fontSize: "14px",
                            fontWeight: "bold",
                            "&:hover": {
                                backgroundColor: "#B0BEC5",
                            },
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
                <InvoicePaymentCard />
                <InvoiceUpdatePaymentCard />
                <InvoicePaymentHistoryCard />
            </Box>
        </>
    );
};

export default DataTable;