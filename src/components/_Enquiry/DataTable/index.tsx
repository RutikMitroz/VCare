import React from "react";
import { Table, TableCell, TableContainer, TableHead, TablePagination, TableRow, Box, } from "@mui/material";
import CustomMenuList from "../../utilities/CustomMenuList";

export const styles = {
    header_table_cell: {
        padding: "10px 16px",
        backgroundColor: "custom.grey_4",
        typography: "subtitle2",
        fontWeight: 600,
        whiteSpace: "nowrap",
    },
    body_table_cell: {
        padding: "8px 16px",
        typography: "subtitle2",
        whiteSpace: "nowrap",
    },
};

interface DataTableProps {
    appointments: unknown[];
    page: number;
    rowsPerPage: number;
    totalNoOfDocs: number;
    handleChangePage: (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
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
    const menuDataRef = React.useRef<unknown | null>(null);
    const [openMenu, setOpenMenu] = React.useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = React.useState<HTMLElement | null>(null);

    return (
        <>
            <Box className="border border-border border-solid rounded-md overflow-hidden" sx={{ overflowX: "auto", width: "100%" }}>
                <TableContainer sx={{ height: "calc(100vh - 7rem - 2rem - 4rem - 5.5rem - 3rem - 4rem - 65px)", position: "relative" }}>
                    <Table stickyHeader>
                        <TableHead className="">
                            <TableRow>
                                <TableCell align="center" sx={styles.header_table_cell}>
                                    Appointment Id
                                </TableCell>
                                <TableCell align="center" sx={styles.header_table_cell}>
                                    Date & Time
                                </TableCell>
                                <TableCell align="center" sx={styles.header_table_cell}>
                                    Patient Name
                                </TableCell>
                                <TableCell align="center" sx={styles.header_table_cell}>
                                    Test Name
                                </TableCell>
                                <TableCell align="center" sx={styles.header_table_cell}>
                                    Payment
                                </TableCell>
                                <TableCell align="center" sx={styles.header_table_cell}>
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        {/* <TableBody>
                            {appointments.map((appointment) => (
                                <TableRow onClick={() => navigate(`/appointments/${appointment?._id ?? ""}`)} key={appointment._id} className="hover:bg-accent hover:cursor-pointer">
                                    <TableCell align="center" sx={styles.body_table_cell}>
                                        {appointment?._id}
                                    </TableCell>
                                    <TableCell align="center" sx={styles.body_table_cell}>
                                        <div >
                                            {`${format(new Date(appointment?.availability?.date), " do LLL, yyyy")}, ${appointment?.availability?.slot?.start_time} - ${appointment?.availability?.slot?.end_time}`}
                                        </div>
                                    </TableCell>
                                    <TableCell align="center" sx={styles.body_table_cell}>
                                        {appointment?.patient_details?.display_name}
                                    </TableCell>
                                    <TableCell align="center" sx={styles.body_table_cell}>
                                        {appointment?.selected_item?.name}
                                    </TableCell>
                                    <TableCell align="center" sx={styles.body_table_cell}>
                                        {appointment?.totalAmount} BWP
                                    </TableCell>
                                    <TableCell align="center" sx={styles.body_table_cell}>
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setOpenMenu(true);
                                                setMenuAnchorEl(e.target as HTMLButtonElement);
                                                menuDataRef.current = appointment;
                                            }}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody> */}
                    </Table>
                </TableContainer>

                <TablePagination
                    sx={{
                        borderTop: "1px solid #dcdcdc",

                        "& .MuiTablePagination-selectLabel": { typography: "subtitle1" },

                        "& .MuiTablePagination-displayedRows": { typography: "subtitle1" },
                    }}
                    rowsPerPageOptions={[10, 25, 50, 100]}
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
                        }
                    ]}
                />
            )}
        </>
    );
};
export default DataTable;
