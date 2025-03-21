import React from "react";
import { Box, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import OrderIdDateCard from "../../components/ui/Cards/OrderIdDateCard";
import { Colors } from "../../constants/Colors";
import DataTable from "./DataTable";

const RenderOrderDetail = () => {
  const { orderId } = useParams();
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  // Order items data
  const orderItems = [
    {
      srNo: "#0001",
      product: "Hikvision 5MP CCTV Camera",
      quantity: 6,
      hsnNo: "02412",
      unit: "NOS",
      rate: 27000
    },
    {
      srNo: "#0002",
      product: "Camera Cable",
      quantity: 10,
      hsnNo: "02412",
      unit: "MTR",
      rate: 9000
    }
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          p: "2rem",
        }}
      >
        <Box sx={{ display: "flex", gap: "2rem" }}>
          <OrderIdDateCard
            label="Order ID"
            value={orderId || "VC-25-00018"}
            isBlue
          />

          <OrderIdDateCard label="Order Date" value="12/03/2025" isBlue />
        </Box>

        <Button
          variant="contained"
          sx={{
            backgroundColor: Colors.primary,
            textTransform: "none",
            height: "40px",
            "&:hover": {
              backgroundColor: Colors.primary,
            },
          }}
        >
          + Create Challan
        </Button>
      </Box>
      <Box sx={{ px: "2rem" }}>
        <DataTable
          items={orderItems}
          page={page}
          rowsPerPage={rowsPerPage}
          totalNoOfDocs={orderItems.length}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default RenderOrderDetail;
