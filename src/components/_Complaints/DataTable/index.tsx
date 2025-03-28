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
  Chip,
} from "@mui/material";
import CustomMenuList from "../../utilities/CustomMenuList";
import { displayShortId } from "../../../utils/displayShortId";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../../constants/Colors";
import convertDateToString from "../../../utils/convertDateToString";

interface DataTableProps {
  complaints: any[];
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
  complaints,
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
                  Complaint ID
                </TableCell>
                <TableCell align="center" sx={headerCellStyle}>
                  Complaint Date
                </TableCell>
                <TableCell align="center" sx={headerCellStyle}>
                  Client Name
                </TableCell>
                <TableCell align="center" sx={headerCellStyle}>
                  Contact Number
                </TableCell>
                <TableCell align="center" sx={headerCellStyle}>
                  Assigned To
                </TableCell>
                <TableCell align="center" sx={headerCellStyle}>
                  Complaint
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    ...headerCellStyle,
                    borderTopRightRadius: "12px",
                  }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints.length > 0 ? (
                complaints.map((complaint, index) => (
                  <TableRow
                    onClick={() => navigate(`/complaints/${complaint._id}`)}
                    key={complaint._id}
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
                      {displayShortId(complaint._id)}
                    </TableCell>
                    <TableCell align="center">{convertDateToString(complaint?.createdAt)}</TableCell>
                    <TableCell align="center">
                      {complaint.client_id.client_name}
                    </TableCell>
                    <TableCell align="center">
                      {complaint.client_id.client_phone}
                    </TableCell>
                    <TableCell align="center">
                      {complaint.assign_to.user_name}
                    </TableCell>
                    <TableCell align="center">{complaint.complaint_details}</TableCell>
                    <TableCell align="center">
                      <Chip
                        label={complaint.status}
                        sx={{
                          backgroundColor:
                            complaint.status === "QUOTATION SENT"
                              ? "#4CAF50"
                              : "#F44336",
                          color: "#FFFFFF",
                          fontWeight: "bold",
                          fontSize: "12px",
                          height: "24px",
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    No complaints available
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
              // fn: () => navigate(`/complaints/${menuDataRef.current?._id ?? ""}`),
            },
          ]}
        />
      )}
    </>
  );
};

export default DataTable;
