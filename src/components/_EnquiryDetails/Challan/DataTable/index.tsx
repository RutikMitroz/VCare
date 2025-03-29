import { Table, TableCell, TableContainer, TableHead, TableRow, Box, TableBody, IconButton, Typography, Button, } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import { Colors } from "../../../../constants/Colors";

interface challan {
    challanId: string;
    createDate: string;
    assignedTo: string;
    products: string;
}

interface DataTableProps {
    setFlag: (isCreating: boolean) => void;
}

const DataTable: React.FC<DataTableProps> = ({ setFlag }) => {
    const challans: challan[] = [
        {
            challanId: "25/02/QT00018",
            createDate: "34rty123456",
            assignedTo: "Amit Kumar",
            products: "Hikvision 5MP CCTV Camera",
        },
        {
            challanId: "25/02/QT00019",
            createDate: "34rty123456",
            assignedTo: "Amit Kumar",
            products: "Hikvision 5MP CCTV Camera",
        },
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
                <Typography sx={{ fontSize: 18, fontWeight: "bold" }} >Challan</Typography>
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
                                    Challan Id
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Create Date
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Assigned To
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Products
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
                            {challans.length > 0 ? (
                                challans.map((row, index) => (
                                    <TableRow
                                        key={row.challanId}
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
                                        <TableCell align="center">{row.challanId}</TableCell>
                                        <TableCell align="center">{row.createDate}</TableCell>
                                        <TableCell align="center">{row.assignedTo}</TableCell>
                                        <TableCell align="center">{row.products}</TableCell>
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
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#1D434C',
                            color: '#FFFFFF',
                            borderRadius: '8px',
                            padding: '16px 24px',
                            textTransform: 'capitalize',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            height: '3.5rem',
                            '&:hover': {
                                backgroundColor: '#004D40',
                            },
                        }}
                    >
                        Create Invoice

                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default DataTable;