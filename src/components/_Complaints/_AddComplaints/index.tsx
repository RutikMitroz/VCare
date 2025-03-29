import { useState } from "react";
import { Box, Button, TextField, MenuItem, Select, InputLabel, FormControl, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { Colors } from "../../../constants/Colors";

// Hooks
import { useGetClients } from "../../../hooks/enquiry/useGetAllClients";
import { useGetAllCategories } from "../../../hooks/masters/useGetAllCategories";
import { useGetAllUsers } from "../../../hooks/enquiry/useGetAllUsers";
import { useAddComplaint } from "../../../hooks/complaints/useAddComplaint";


// Updated styles for both TextField and Select components
const textFieldStyles = {
  backgroundColor: "white",
  "& .MuiOutlinedInput-root": {
    height: "50px",
    fontSize: "14px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
    transform: "translate(14px, 16px) scale(1)",
    "&.Mui-focused, &.MuiFormLabel-filled": {
      transform: "translate(14px, -9px) scale(0.75)",
    }
  },
  "& input::placeholder": {
    fontSize: "14px"
  },
  "& .MuiFormHelperText-root": {
    fontSize: "12px",
    marginTop: "2px"
  },
  "& .MuiMenuItem-root": {
  fontSize: "14px", // Reduce the font size of dropdown options
},
};
const datepickerstyle={
  width: "180px",
  backgroundColor: "white",
  "& .MuiOutlinedInput-root": {
    height: "50px",
    fontSize: "14px",
    borderRadius: "8px",
  },
  "& .MuiInputBase-input": {
    padding: "10px 14px",
    fontSize: "14px",
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
    transform: "translate(14px, 16px) scale(1)",
    "&.Mui-focused, &.MuiFormLabel-filled": {
      transform: "translate(14px, -9px) scale(0.75)",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#CBD5E1",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#94A3B8",
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#334155",
  },
  "& .MuiSvgIcon-root": {
    color: "#334155",
  },
}
const dropdownStyles = {
  backgroundColor: "white",
  "& .MuiOutlinedInput-root": {
    height: "50px",
    fontSize: "14px",
    borderRadius: "8px",
    "& fieldset": {
      borderColor: "#CBD5E1",
    },
    "&:hover fieldset": {
      borderColor: "#94A3B8",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#334155",
    },
  },
  "& .MuiInputBase-input": {
    padding: "10px 14px",
    fontSize: "14px",
  },
  "& .MuiSvgIcon-root": {
    color: "#334155",
  },
  "& .MuiInputLabel-root": {
    fontSize: "14px",
    transform: "translate(14px, 16px) scale(1)",
    "&.Mui-focused, &.MuiFormLabel-filled": {
      transform: "translate(14px, -9px) scale(0.75)",
    },
  },
  "& .MuiMenuItem-root": {
    fontSize: "14px",
  },
};


// Validation schema
const validationSchema = Yup.object({
  client_id: Yup.string().required("Name of client is required"),
  address: Yup.string().required("Address is required"),
  complaint_details: Yup.string().required("Complaint details are required"),
  category: Yup.string().required("Category is required"),
  assign_to: Yup.string().required("Assign to is required"),
});

const RenderAddComplaints = () => {
  const { data: clients } = useGetClients();
  const { data: categories } = useGetAllCategories();
  const { data: userList } = useGetAllUsers();
  const { mutate } = useAddComplaint();

  const [selectedDate, setSelectedDate] = useState(dayjs("2025-03-28"));

  const initialValues = {
    client_id: "",
    category: "",
    assign_to: "",
    complaint_details: "",
    address: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    mutate(values, {
      onSuccess: () => {
          resetForm();
      }
  })
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "calc(100vh - 96px)",
        width: "100%",
        backgroundColor: "#f0f4f8",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "1000px", p: "2rem" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 500, fontSize: "18px" }}>
            Complaint
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
            disabled
              value={selectedDate}
              onChange={(newValue) => setSelectedDate(newValue)}
              renderInput={(params) => <TextField {...params} />}
              sx={datepickerstyle}
            />
          </LocalizationProvider>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
                  {/* Client Name Dropdown */}
                  <FormControl fullWidth size="small">
                    <InputLabel sx={{fontSize:"18px"}}>Client Name</InputLabel>
                    <Field
                      as={Select}
                      name="client_id"
                      label="Client Name"
                      sx={dropdownStyles}
                      error={touched.client_id && !!errors.client_id}
                      MenuProps={{
                        PaperProps: {
                            sx: {
                                maxHeight: "250px",
                                display: "flex",
                                flexDirection: "column",
                            },
                        },
                    }}
                    >
                      {clients?.data.map((client) => (
                        <MenuItem  sx={{ fontSize: "18px" }} key={client._id} value={client._id}>
                          {client.client_name}
                        </MenuItem>
                      ))}
                    </Field>
                    {touched.client_id && errors.client_id && (
                      <Box sx={{ color: "red", fontSize: "12px", mt: 0.5 }}>
                        {errors.client_id}
                      </Box>
                    )}
                  </FormControl>

                  {/* Category Dropdown */}
                  <FormControl fullWidth size="small">
                    <InputLabel sx={{fontSize:"18px"}}>Category</InputLabel>
                    <Field
                      as={Select}
                      name="category"
                      label="Category"
                      sx={dropdownStyles}
                      error={touched.category && !!errors.category}
                      MenuProps={{
                        PaperProps: {
                            sx: {
                                maxHeight: "250px",
                                display: "flex",
                                flexDirection: "column",
                            },
                        },
                    }}
                    >
                      <MenuItem  sx={{ fontSize: "18px" }} value="" disabled>
                        Select Category
                      </MenuItem>
                      {categories?.map((category) => (
                        <MenuItem  sx={{ fontSize: "18px" }} key={category._id} value={category.category_name}>
                          {category.category_name}
                        </MenuItem>
                      ))}
                    </Field>
                    {touched.category && errors.category && (
                      <Box sx={{ color: "red", fontSize: "12px", mt: 0.5 }}>
                        {errors.category}
                      </Box>
                    )}
                  </FormControl>

                  {/* Assign Complaint Dropdown */}
                  <FormControl fullWidth size="small">
                    <InputLabel sx={{fontSize:"18px"}}>Assign Complaint</InputLabel>
                    <Field
                      as={Select}
                      name="assign_to"
                      label="Assign Complaint"
                      sx={dropdownStyles}
                      error={touched.assign_to && !!errors.assign_to}
                      MenuProps={{
                        PaperProps: {
                            sx: {
                                maxHeight: "250px",
                                display: "flex",
                                flexDirection: "column",
                            },
                        },
                    }}
                    >
                      <MenuItem value="" disabled>
                        Select Name
                      </MenuItem>
                      {userList?.map((user) => (
                        <MenuItem  sx={{ fontSize: "18px" }} key={user._id} value={user._id}>
                          {user.user_name}
                        </MenuItem>
                      ))}
                    </Field>
                    {touched.assign_to && errors.assign_to && (
                      <Box sx={{ color: "red", fontSize: "12px", mt: 0.5 }}>
                        {errors.assign_to}
                      </Box>
                    )}
                  </FormControl>
                </Box>

                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }}>
                  <Field
                    as={TextField}
                    name="complaint_details"
                    label="Complaint Details"
                    placeholder="Write..."
                    multiline
                    row={4}
                    fullWidth
                    sx={{...textFieldStyles}}
                    error={touched.complaint_details && !!errors.complaint_details}
                    helperText={touched.complaint_details && errors.complaint_details}
                  />

                  <Field
                    as={TextField}
                    name="address"
                    label="Address"
                    placeholder="Write..."
                    multiline
                    fullWidth
                    sx={textFieldStyles}
                    error={touched.address && !!errors.address}
                    helperText={touched.address && errors.address}
                  />
                </Box>

                <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center", mt: 2 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      bgcolor: Colors.primary,
                      color: "white",
                      fontSize: "14px",
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: Colors.primary,
                      },
                    }}
                  >
                    Raise Complaint
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={() => window.history.back()}
                    sx={{
                      bgcolor: "#E2E8F0",
                      color: "black",
                      fontSize: "14px",
                      textTransform: "none",
                      "&:hover": {
                        bgcolor: "#CBD5E1",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default RenderAddComplaints;