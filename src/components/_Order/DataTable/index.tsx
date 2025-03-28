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
} from "@mui/material";
import { displayShortId } from "../../../utils/displayShortId";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../../constants/Colors";
import MessageBox from "../../utilities/MessageBox";

interface Order {
  _id: string;
  quotation_id: {
    _id: string;
    clientId: {
      client_name: string;
      client_phone: string;
    };
    enquiry_id: string;
    product_name: string;
    total_amount: number;
  };
  createdAt: string;
  order_status: string;
  estimate_required_time: string;
}

interface DataTableProps {
  appointments: Order[];
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "#459CFF";
      case "Pending":
        return "#FF0000";
      case "Completed":
        return "#60CA72";
      default:
        return "#F44336";
    }
  };

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
                  Product
                </TableCell>
                <TableCell align="center" sx={headerCellStyle}>
                  Total Amount
                </TableCell>
                <TableCell align="center" sx={headerCellStyle}>
                  Assigned Technician
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
              {appointments.length > 0 ? (
                appointments.map((order, index) => (
                  <TableRow
                    onClick={() =>
                      navigate(`/enquiry/${order.quotation_id?.enquiry_id}`)
                    }
                    key={order._id}
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
                      {displayShortId(order._id)}
                    </TableCell>
                    <TableCell align="center">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell align="center">
                      {order.quotation_id?.clientId?.client_name}
                    </TableCell>
                    <TableCell align="center">
                      {order.quotation_id?.clientId?.client_phone}
                    </TableCell>
                    <TableCell align="center">
                      {order.quotation_id?.product_name}
                    </TableCell>
                    <TableCell align="center">
                      ₹{order.quotation_id?.total_amount}
                    </TableCell>
                    <TableCell align="center">Jack Reacher</TableCell>
                    <TableCell align="center">
                      <span
                        style={{
                          color: getStatusColor(order.order_status),
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        {order.order_status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No Orders available
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
