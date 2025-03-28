import Sidebar from "../ui/Sidebar";
import { Box } from "@mui/material";

// import AddIcon from '@mui/icons-material/Add';
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DataTable from "./DataTable";
import { useGetAllOrders } from "../../hooks/orders/useGetAllOrders";
import MessageBox from "../utilities/MessageBox";
import Spinner from "../utilities/Spinner";
import { useState, MouseEvent, ChangeEvent } from "react";



const RenderOrder = () => {
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => setPage(newPage + 1);

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const { data: orderData, isFetching, isError } = useGetAllOrders({ page, limit: rowsPerPage });


  const summary = [
    {
      text: "Total Orders",
      value: orderData?.summary?.total_order || 0,
      color: "#459CFF",
    },
    {
      text: "In Progress Orders",
      value: orderData?.summary?.in_progress || 0,
      color: "#60CA72",
    },
    {
      text: "Pending Orders",
      value: orderData?.summary?.pending || 0,
      color: "#FF0000",
    },
    {
      text: "Completed",
      value: orderData?.summary?.completed || 0,
      color: "#1F1F1F",
    },
  ];

  return (
    <Box sx={{ display: "flex", gap: "2rem", justifyContent: "space-between" }}>
      <Box
        sx={{
          width: "25%",
          backgroundColor: "white",
          borderRadius: "16px",
          padding: "16px",
          border: "2px solid #E0E0E0",
        }}
      >
        <Sidebar summary={summary} />
      </Box>
      <Box sx={{ width: "75%" }}>
        <Box
          sx={{
            margin: "0.5rem 0 1rem 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextField
            placeholder="Search"
            variant="outlined"
            sx={{
              width: "30%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#FFFFFF",
                height: "3.2rem",
                "& fieldset": {
                  borderColor: "#E0E0E0",
                },
                "&:hover fieldset": {
                  borderColor: "#B0BEC5",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00695C",
                },
              },
              "& .MuiInputBase-input": {
                padding: "8px 14px",
                color: "#B0BEC5",
                fontSize: "14px",
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#B0BEC5",
                opacity: 1,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#B0BEC5", fontSize: "20px" }} />
                </InputAdornment>
              ),
            }}
          />
          {/* <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddIcon sx={{ fontSize: '16px' }} />}
                        sx={{
                            backgroundColor: '#1D434C',
                            color: '#FFFFFF',
                            borderRadius: '8px',
                            padding: '16px 16px',
                            textTransform: 'capitalize',
                            fontWeight: 'bold',
                            fontSize: '14px',
                            height: '2.5rem',
                            '&:hover': {
                                backgroundColor: '#004D40',
                            },
                        }}
                    >
                        Add Enquiry

                    </Button> */}
        </Box>
        {isError ? (
          <MessageBox message="Something went wrong" />
        ) : isFetching ? (
          <Spinner />
        ) : (
          <DataTable
            appointments={orderData?.data || []}
            page={page}
            rowsPerPage={rowsPerPage}
            totalNoOfDocs={orderData?.pagination?.totalOrders || 0}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        )}
      </Box>
    </Box>
  );
};

export default RenderOrder;
