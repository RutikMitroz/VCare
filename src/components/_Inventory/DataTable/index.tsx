import React from "react";
import { Table, TableCell, TableContainer, TableHead, TablePagination, TableRow, Box, TableBody, IconButton } from "@mui/material";
import CustomMenuList from "../../utilities/CustomMenuList";
import { displayShortId } from "../../../utils/displayShortId";
import { Colors } from "../../../constants/Colors";
import EditIcon from '@mui/icons-material/Edit';

interface DataTableProps {
    products: any[];
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
    products,
    page,
    rowsPerPage,
    totalNoOfDocs,
    handleChangePage,
    handleChangeRowsPerPage,
}: DataTableProps) => {
    const menuDataRef = React.useRef<any | null>(null);
    const [openMenu, setOpenMenu] = React.useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<HTMLElement | null>(
        null
    );

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
                                    Product ID
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Product Name
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Product Category
                                </TableCell>
                                <TableCell align="center" sx={headerCellStyle}>
                                    Available Product
                                </TableCell>
                                <TableCell align="center" sx={{
                                    ...headerCellStyle,
                                    borderTopRightRadius: "12px",
                                }}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products.length > 0 ? (products.map((product, index) => (
                                <TableRow
                                    key={product._id}
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
                                    <TableCell align="center">{displayShortId(product._id)}</TableCell>
                                    <TableCell align="center">{product?.product_name}</TableCell>
                                    <TableCell align="center">{product?.product_category?.category_name}</TableCell>
                                    <TableCell align="center">{product?.quantity}</TableCell>
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
                                                <EditIcon fontSize="small" />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
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
                            // fn: () => navigate(`/products/${menuDataRef.current?._id ?? ""}`),
                        },
                    ]}
                />
            )}
        </>
    );
};

export default DataTable;