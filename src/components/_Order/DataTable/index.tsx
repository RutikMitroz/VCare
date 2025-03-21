import React from "react";
import {
    Table, TableCell, TableContainer, TableHead, TablePagination, TableRow,
    Box, TableBody, Link, Chip,
} from "@mui/material";
import CustomMenuList from "../../utilities/CustomMenuList";

interface Enquiry {
    id: string;
    date: string;
    clientName: string;
    phone: string;
    assignedTo: string;
    enquiryFor: string;
    status: string;
}

interface DataTableProps {
    appointments: Enquiry[];
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
    appointments,
    page,
    rowsPerPage,
    totalNoOfDocs,
    handleChangePage,
    handleChangeRowsPerPage,
}: DataTableProps) => {
    const menuDataRef = React.useRef<Enquiry | null>(null);
    const [openMenu, setOpenMenu] = React.useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<HTMLElement | null>(
        null
    );

    const handleViewDetailsClick = (
        event: React.MouseEvent<HTMLElement>,
        row: Enquiry
    ) => {
        menuDataRef.current = row;
        setMenuAnchorEl(event.currentTarget);
        setOpenMenu(true);
    };

    const headerCellStyle = {
        backgroundColor: "#1D434C",
        color: "#FFFFFF",
        // fontWeight: "bold",
        fontSize: "14px",
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
                                    Order ID
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Date
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Customer Name
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Phone
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Products
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Total Amount
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Assigned Technician
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Status
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
                            {appointments.length > 0 ? (
                                appointments
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{
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
                                            <TableCell align="center">{row.id}</TableCell>
                                            <TableCell align="center">{row.date}</TableCell>
                                            <TableCell align="center">{row.clientName}</TableCell>
                                            <TableCell align="center">{row.phone}</TableCell>
                                            <TableCell align="center">{row.assignedTo}</TableCell>
                                            <TableCell align="center">{row.enquiryFor}</TableCell>
                                            <TableCell align="center">
                                                <Chip
                                                    label={row.status}
                                                    sx={{
                                                        backgroundColor:
                                                            row.status === "QUOTATION SENT"
                                                                ? "#4CAF50"
                                                                : "#F44336",
                                                        color: "#FFFFFF",
                                                        fontWeight: "bold",
                                                        fontSize: "12px",
                                                        height: "24px",
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <Link
                                                    component="button"
                                                    underline="hover"
                                                    sx={{
                                                        color: "#00695C",
                                                        fontWeight: "bold",
                                                        fontSize: "14px",
                                                    }}
                                                    onClick={(event) =>
                                                        handleViewDetailsClick(event, row)
                                                    }
                                                >
                                                    View Details
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8} align="center">
                                        No data available
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

            {menuAnchorEl && openMenu && menuDataRef.current && (
                <CustomMenuList
                    open={openMenu}
                    setOpenMenu={setOpenMenu}
                    menuAnchorEl={menuAnchorEl}
                    setMenuAnchorEl={setMenuAnchorEl}
                    menuItems={[
                        {
                            title: "More details",
                            iconImage: "/assets/icons/more_details.png",
                            // fn: () => navigate(`/appointments/${menuDataRef.current?._id ?? ""}`),
                        },
                    ]}
                />
            )}
        </>
    );
};

export default DataTable;