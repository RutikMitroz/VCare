import React from "react";
import {
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Box,
    TableBody,
} from "@mui/material";
import { Colors } from "../../../constants/Colors";

interface OrderItem {
    srNo: string;
    product: string;
    quantity: number;
    hsnNo: string;
    unit: string;
    rate: number;
}

interface DataTableProps {
    items: OrderItem[];
    page: number;
    rowsPerPage: number;
    totalNoOfDocs: number;
    handleChangePage: (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DataTable = ({
    items = [],
    page,
    rowsPerPage,
    totalNoOfDocs,
    handleChangePage,
    handleChangeRowsPerPage,
}: DataTableProps) => {
    const headerCellStyle = {
        backgroundColor: Colors.primary,
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: "14px",
        textTransform: "uppercase",
        borderBottom: "1px solid #E0E0E0",
        padding: "12px",
        position: "sticky",
        top: 0,
        zIndex: 1,
    } as const;

    // Sample data for demonstration


    const displayData = items.length > 0 ? items : [];

    return (
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
                                Sr. No.
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
                            <TableCell
                                align="center"
                                sx={{
                                    ...headerCellStyle,
                                    borderTopRightRadius: "12px",
                                }}
                            >
                                Rate
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayData.map((row, index) => (
                            <TableRow
                                key={row.srNo}
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
                                <TableCell align="center">{row.srNo}</TableCell>
                                <TableCell align="center">{row.product}</TableCell>
                                <TableCell align="center">{row.quantity}</TableCell>
                                <TableCell align="center">{row.hsnNo}</TableCell>
                                <TableCell align="center">{row.unit}</TableCell>
                                <TableCell align="center">₹{row.rate.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                sx={{
                    borderTop: "1px solid #dcdcdc",
                    "& .MuiTablePagination-selectLabel": { typography: "subtitle1" },
                    "& .MuiTablePagination-displayedRows": { typography: "subtitle1" },
                }}
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={totalNoOfDocs}
                rowsPerPage={rowsPerPage}
                page={page - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
};

export default DataTable;