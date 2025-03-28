import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import Sidebar from "../ui/Sidebar";
import DataTable from './DataTable';
import AddIcon from '@mui/icons-material/Add';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { useGetProducts } from '../../hooks/enquiry/useGetAllProducts';
import MessageBox from '../utilities/MessageBox';
import Spinner from '../utilities/Spinner';
import { useNavigate } from 'react-router-dom';

const RenderInventory = () => {

  const navigate = useNavigate();

  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [search, setSearch] = useState<string>("");

  const handleChangePage = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => setPage(newPage + 1);

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const { data, isFetching, isError } = useGetProducts({ page, limit: rowsPerPage, search });

  const summary = [
    {
      text: "Total Products",
      value: data?.summary?.total_items,
      color: "#459CFF"
    },
  ];

  return (
    <Box sx={{ display: "flex", gap: "2rem", justifyContent: "space-between" }}>
      <Box sx={{ width: "25%", backgroundColor: "white", borderRadius: "16px", padding: "16px", border: "2px solid #E0E0E0" }}>

        <Sidebar summary={summary} />
      </Box>
      <Box sx={{ width: "75%" }}>
        <Box
          sx={{
            margin: '0.5rem 0 1rem 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TextField
            placeholder="Search"
            variant="outlined"
            sx={{
              width: '30%',
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                backgroundColor: '#FFFFFF',
                height: '3.2rem',
                '& fieldset': {
                  borderColor: '#E0E0E0',
                },
                '&:hover fieldset': {
                  borderColor: '#B0BEC5',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00695C',
                },
              },
              '& .MuiInputBase-input': {
                padding: '8px 14px',
                color: '#B0BEC5',
                fontSize: '14px',
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#B0BEC5',
                opacity: 1,
              },
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#B0BEC5', fontSize: '20px' }} />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            onClick={() => navigate("/inventory/add-grn")}
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
            Add GRN

          </Button>
        </Box>
        {isError ? <MessageBox message="Something went wrong" />
          : isFetching ? <Spinner /> :
            <DataTable
              products={data?.data}
              page={page}
              rowsPerPage={rowsPerPage}
              totalNoOfDocs={data?.pagination?.total_products}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            />
        }
      </Box>
    </Box>
  );
};

export default RenderInventory;
