import { Table, TableCell, TableContainer, TableHead, TableRow, Box, TableBody, Button, } from "@mui/material";
import OrderIdAndDateCard from "../../../ui/Cards/OrderIdAndDateCard";
import { useAppDispatch } from "../../../../redux/store";
import { moveToNextStep } from "../../../../redux/progressBar/progressBarSlice";

interface Quotation {
    id: string;
    products: string;
    qty: string;
    hsnNo: string;
    unit: string;
    rate: string;
}

const DataTable = () => {

    const dispatch = useAppDispatch();
    const quotations: Quotation[] = [
        {
            id: "25/02/QT00018",
            products: "Hikvision 5MP CCTV Camera",
            qty: "10",
            hsnNo: "₹75ut4",
            unit: "20",
            rate: "₹36,000",
        },
        {
            id: "25/02/QT00018",
            products: "Hikvision 5MP CCTV Camera",
            qty: "70",
            hsnNo: "₹75tyt4",
            unit: "10",
            rate: "₹65,000",
        },
    ];

    const headerCellStyle = {
        backgroundColor: "#1D434C",
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <OrderIdAndDateCard label="Order ID" value="25/02/QT00018" />
                    <OrderIdAndDateCard label="Order Date" value="25 Jan 2025" />
                </Box>
                <Button
                    onClick={() => dispatch(moveToNextStep())}
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
                    Create Challan

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
                                    Sr No.
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Products
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Qty.
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    HSN No.
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Unit
                                </TableCell>
                                <TableCell align="center" sx={{
                                    ...headerCellStyle,
                                    borderTopRightRadius: "12px",
                                }}>
                                    Rate
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {quotations.length > 0 ? (
                                quotations.map((row, index) => (
                                    <TableRow
                                        key={row.id}
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
                                        <TableCell align="center">{row.id}</TableCell>
                                        <TableCell align="center">{row.products}</TableCell>
                                        <TableCell align="center">{row.qty}</TableCell>
                                        <TableCell align="center">{row.hsnNo}</TableCell>
                                        <TableCell align="center">{row.unit}</TableCell>
                                        <TableCell align="center">{row.rate}</TableCell>
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
            </Box>
        </>
    );
};

export default DataTable;