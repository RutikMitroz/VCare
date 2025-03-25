import { Table, TableCell, TableContainer, TableHead, TableRow, Box, TableBody, IconButton, Typography, Button, Checkbox } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ShareIcon from "@mui/icons-material/Share";
import { Colors } from "../../../../constants/Colors";
import { useGetQuotationsByEnquiryId } from "../../../../hooks/enquiry/useGetQuotationsByEnquiry";
import convertDateToString from "../../../../utils/convertDateToString";
import { displayShortId } from "../../../../utils/displayShortId";
import { useState } from "react";
import { useCreateOrder } from "../../../../hooks/enquiry/useCreateQuotation";
import { useQueryClient } from "@tanstack/react-query";

interface DataTableProps {
    setFlag: (isCreating: boolean) => void;
    enquiryId: string;
}

const DataTable: React.FC<DataTableProps> = ({ setFlag, enquiryId }) => {
    const queryClient = useQueryClient();
    const { data } = useGetQuotationsByEnquiryId(enquiryId);
    const { mutate: createOrder } = useCreateOrder();

    const [selectedQuotationId, setSelectedQuotationId] = useState<string | null>(null);

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

    const handleCheckboxChange = (quotationId: string) => {
        setSelectedQuotationId((prev) => (prev === quotationId ? null : quotationId));
    };

    const handleConvertToOrder = () => {
        if (selectedQuotationId) {
            const selectedQuotation = data?.data?.find((q: any) => q._id === selectedQuotationId);
            if (selectedQuotation) {
                const orderPayload = {
                    enquiryId,
                    quotation_id: selectedQuotationId,
                    products: selectedQuotation.products,
                    total_amount: selectedQuotation.total_amount,
                    taxable_amount: selectedQuotation.taxable_amount,
                    discount: selectedQuotation.discount,
                    discount_amount: selectedQuotation.discount_amount,
                    net_amount: selectedQuotation.net_amount,
                };

                createOrder(orderPayload, {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: ["enquiries"] });
                        queryClient.invalidateQueries({ queryKey: ['enquiry-by-id', enquiryId] });
                        setSelectedQuotationId(null);
                    },
                    onError: (error) => console.error("Error creating order:", error),
                });
            }
        }
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Typography sx={{ fontSize: 18, fontWeight: "bold" }}>Quotations</Typography>
                <Button
                    onClick={() => setFlag(true)}
                    variant="contained"
                    sx={{
                        backgroundColor: "#1D434C",
                        color: "#FFFFFF",
                        borderRadius: "8px",
                        padding: "16px 22px",
                        textTransform: "capitalize",
                        fontWeight: "bold",
                        fontSize: "14px",
                        height: "2.5rem",
                        "&:hover": {
                            backgroundColor: "#004D40",
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
                                    Select
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
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
                            {data?.data?.length > 0 ? (
                                data?.data?.map((quotation: any, index: number) => (
                                    <TableRow
                                        key={quotation._id}
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
                                        <TableCell align="center">
                                            <Checkbox
                                                checked={selectedQuotationId === quotation._id}
                                                onChange={() => handleCheckboxChange(quotation._id)}
                                                onClick={(e) => e.stopPropagation()}
                                                sx={{
                                                    color: Colors.primary,
                                                    "&.Mui-checked": {
                                                        color: Colors.primary,
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">{displayShortId(quotation._id)}</TableCell>
                                        <TableCell align="center">{convertDateToString(quotation.createdAt)}</TableCell>
                                        <TableCell align="center">{convertDateToString(quotation.enquiry_id.date)}</TableCell>
                                        <TableCell align="center">{quotation.net_amount}</TableCell>
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
                                    <TableCell colSpan={6} align="center">
                                        No Quotations available
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Button
                    variant="contained"
                    onClick={handleConvertToOrder}
                    disabled={!selectedQuotationId}
                    sx={{
                        backgroundColor: selectedQuotationId ? Colors.primary : "#B0BEC5",
                        color: "#FFFFFF",
                        borderRadius: "8px",
                        padding: "8px 16px",
                        textTransform: "capitalize",
                        fontSize: "14px",
                        fontWeight: "bold",
                        "&:hover": {
                            backgroundColor: selectedQuotationId ? "#004D40" : "#B0BEC5",
                        },
                    }}
                >
                    Convert to Order
                </Button>
            </Box>
        </>
    );
};

export default DataTable;