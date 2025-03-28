import React from "react";
import { Table, TableCell, TableContainer, TableHead, TablePagination, TableRow, Box, TableBody, Typography, } from "@mui/material";
import { displayShortId } from "../../../utils/displayShortId";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../../constants/Colors";

interface DataTableProps {
    enquiries: any[];
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
    enquiries,
    page,
    rowsPerPage,
    totalNoOfDocs,
    handleChangePage,
    handleChangeRowsPerPage,
}: DataTableProps) => {

    const navigate = useNavigate();

    const headerCellStyle = {
        backgroundColor: Colors.primary,
        color: "#FFFFFF",
        fontSize: "14px",
        textTransform: "capitalize",
        borderBottom: "1px solid #E0E0E0",
        padding: "12px",
        position: "sticky",
        top: 0,
        zIndex: 1,
    } as const;

    return (
        <>
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
                                    Enquiry ID
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Date
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Client Name
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Phone
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Assigned To
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Enquiry For
                                </TableCell>
                                <TableCell align="center" sx={{
                                    ...headerCellStyle,
                                    borderTopRightRadius: "12px",
                                }}>
                                    Status
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {enquiries.length > 0 ? (enquiries.map((enquiry, index) => (
                                <TableRow
                                    onClick={() => navigate(`/enquiry/${enquiry._id}`)}
                                    key={enquiry._id}
                                    sx={{
                                        cursor: "pointer",
                                        backgroundColor:
                                            index % 2 === 0 ? "#F5F7FA" : "#FFFFFF",
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
                                    <TableCell align="center">{displayShortId(enquiry._id)}</TableCell>
                                    <TableCell align="center">{enquiry?.date}</TableCell>
                                    <TableCell align="center">{enquiry.client_id.client_name}</TableCell>
                                    <TableCell align="center">{enquiry.client_id.client_phone}</TableCell>
                                    <TableCell align="center">{enquiry.assign_to.user_name}</TableCell>
                                    <TableCell align="center">{enquiry.enquiry_for}</TableCell>
                                    <TableCell align="center">
                                        {/* <Chip
                                            label={enquiry.status === "not_contacted" ? "Not Contacted" : enquiry.status === "quotation_created" ? "Quotation Created" : enquiry.status === "order_created" ? "Order Created" : enquiry.status}
                                            sx={{
                                                backgroundColor:
                                                    enquiry.status === "not_contacted"
                                                        ? "#F44336"
                                                        : "#4CAF50",
                                                color: "#FFFFFF",
                                                fontWeight: "bold",
                                                fontSize: "12px",
                                                height: "24px",
                                            }}
                                        /> */}
                                        <Typography sx={{
                                            color:
                                                enquiry.status === "not_contacted"
                                                    ? "#F44336"
                                                    : "#4CAF50",
                                            fontSize: "14px",
                                            height: "24px",
                                        }}>{enquiry.status === "not_contacted" ? "Not Contacted" : enquiry.status === "quotation_created" ? "Quotation Created" : enquiry.status === "order_created" ? "Order Created" : enquiry.status}</Typography>
                                    </TableCell>
                                </TableRow>
                            ))

                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No Enquiries available
                                    </TableCell>
                                </TableRow>
                            )}
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
        </>
    );
};

export default DataTable;