import { Table, TableCell, TableContainer, TableHead, TableRow, Box, TableBody, Button, } from "@mui/material";
import OrderIdAndDateCard from "../../../ui/Cards/OrderIdAndDateCard";
import { Colors } from "../../../../constants/Colors";
import convertDateToString from "../../../../utils/convertDateToString";
import { displayShortId } from "../../../../utils/displayShortId";
import { useUpdateEnquiry } from "../../../../hooks/enquiry/useUpdateEnquiry";
import { useQueryClient } from "@tanstack/react-query";

interface DataTableProps {
    orderDetails: any;
    enquiryId: string;
}

const DataTable = ({ orderDetails, enquiryId }: DataTableProps) => {

    const { mutate } = useUpdateEnquiry();
    const queryClient = useQueryClient();

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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <OrderIdAndDateCard label="Order ID" value={orderDetails?._id} />
                    <OrderIdAndDateCard label="Order Date" value={convertDateToString(orderDetails?.createdAt)} />
                </Box>
                <Button
                    onClick={() => {
                        mutate({
                            enquiryId: enquiryId,
                            enquiryData: {
                                status: "order_created"
                            }
                        }, {
                            onSuccess: () => {
                                queryClient.invalidateQueries({ queryKey: ['enquiries'] });
                                queryClient.invalidateQueries({ queryKey: ['enquiry-by-id', enquiryId] });
                            }
                        })
                    }}
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
                                    Product Name
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
                            {orderDetails?.quotation_id?.products?.length > 0 ? (
                                orderDetails?.quotation_id?.products?.map((product: any, index: number) => (
                                    <TableRow
                                        key={product?._id?._id}
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
                                        <TableCell align="center">{displayShortId(product?._id?._id)}</TableCell>
                                        <TableCell align="center">{product?._id?.product_name}</TableCell>
                                        <TableCell align="center">{product?._id?.qty}</TableCell>
                                        <TableCell align="center">{product?._id?.HSN_code
                                        }</TableCell>
                                        <TableCell align="center">{product?._id?.unit}</TableCell>
                                        <TableCell align="center">{product?._id?.product_price
                                        }</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No products available
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