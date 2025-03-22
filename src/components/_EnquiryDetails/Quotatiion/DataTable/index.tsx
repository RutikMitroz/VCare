import { Table, TableCell, TableContainer, TableHead, TableRow, Box, TableBody, IconButton, Typography, Button, } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import { useAppDispatch } from "../../../../redux/store";
import { moveToNextStep } from "../../../../redux/progressBar/progressBarSlice";
import { Colors } from "../../../../constants/Colors";

interface Quotation {
    id: string;
    quotationDate: string;
    enquiryDate: string;
    amount: string;
    dimensions: string;
}

interface DataTableProps {
    setFlag: (isCreating: boolean) => void;
    quotations: any[];
}

const DataTable: React.FC<DataTableProps> = ({ setFlag, quotations }) => {

    const dispatch = useAppDispatch();

    // const quotations: Quotation[] = [
    //     {
    //         id: "25/02/QT00018",
    //         quotationDate: "26 Jan 2025",
    //         enquiryDate: "25 Jan 2025",
    //         amount: "₹27,000",
    //         dimensions: "20 * 20",
    //     },
    //     {
    //         id: "25/02/QT00017",
    //         quotationDate: "25 Jan 2025",
    //         enquiryDate: "25 Jan 2025",
    //         amount: "₹36,000",
    //         dimensions: "20 * 20",
    //     },
    // ];

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
                <Typography sx={{ fontSize: 18, fontWeight: "bold" }} >Quotations</Typography>
                <Button
                    onClick={() => setFlag(true)}
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
                    Create Quotation

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
                                        onClick={() => {
                                            dispatch(moveToNextStep());
                                        }}
                                        key={row.id}
                                        sx={{
                                            cursor: "pointer",
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
                                        No Quotations available
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