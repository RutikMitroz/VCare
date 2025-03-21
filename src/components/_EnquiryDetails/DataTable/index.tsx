import React from "react";
import { Table, TableCell, TableContainer, TableHead, TableRow, Box, TableBody, IconButton, } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";

interface Quotation {
    id: string;
    quotationDate: string;
    enquiryDate: string;
    amount: string;
    dimensions: string;
}

const DataTable = () => {
    // const menuDataRef = React.useRef<Quotation | null>(null);
    // const [openMenu, setOpenMenu] = React.useState(false);
    // const [menuAnchorEl, setMenuAnchorEl] = React.useState<HTMLElement | null>(null);

    const quotations: Quotation[] = [
        {
            id: "25/02/QT00018",
            quotationDate: "26 Jan 2025",
            enquiryDate: "25 Jan 2025",
            amount: "₹27,000",
            dimensions: "20 * 20",
        },
        {
            id: "25/02/QT00017",
            quotationDate: "25 Jan 2025",
            enquiryDate: "25 Jan 2025",
            amount: "₹36,000",
            dimensions: "20 * 20",
        },
    ];

    // const handleViewDetailsClick = (
    //     event: React.MouseEvent<HTMLElement>,
    //     row: Quotation
    // ) => {
    //     menuDataRef.current = row;
    //     setMenuAnchorEl(event.currentTarget);
    //     setOpenMenu(true);
    // };

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
                                    Quotation ID
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Quotation Date
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Enquiry Date
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Amount
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
                                        <TableCell align="center">{row.quotationDate}</TableCell>
                                        <TableCell align="center">{row.enquiryDate}</TableCell>
                                        <TableCell align="center">{row.amount}</TableCell>
                                        <TableCell align="center">
                                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                                                <IconButton
                                                    sx={{
                                                        color: "#424242",
                                                        "&:hover": {
                                                            color: "#00695C",
                                                        },
                                                    }}
                                                >
                                                    <PrintIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    sx={{
                                                        color: "#424242",
                                                        "&:hover": {
                                                            color: "#00695C",
                                                        },
                                                    }}
                                                    // onClick={(event) => handleViewDetailsClick(event, row)}
                                                >
                                                    <VisibilityIcon sx={{ color: "#4398D3" }} fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    sx={{
                                                        color: "#424242",
                                                        "&:hover": {
                                                            color: "#00695C",
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
            </Box>
        </>
    );
};

export default DataTable;