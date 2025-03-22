import React from "react";
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Colors } from "../../constants/Colors";

// Sample data for role options
const roleOptions = [
  "Admin",
  "Manager",
  "Supervisor",
  "Staff"
];

// Common styles for text fields
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
  }
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Mail Id is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  role: Yup.string().required("Role is required"),
  address: Yup.string().required("Address is required")
});

const RenderUserMaster = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: "",
      role: "",
      address: ""
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <Box 
      sx={{ 
        display: "flex", 
        flexDirection: "column",
        alignItems: "center",
        minHeight: "calc(100vh - 96px)",
        width: "100%",
      }}
    >
      <Box 
        sx={{ 
          width: "100%",
          maxWidth: "1000px",
          p: "2rem",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 500, mb: 3, fontSize: "18px" }}>
          User Master
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* First Row */}
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                placeholder="Enter name"
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                name="email"
                label="Mail Id"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                placeholder="Enter email id"
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                placeholder="Enter sub unit name"
                sx={textFieldStyles}
              />
            </Box>

            {/* Role Field */}
            <FormControl 
              error={formik.touched.role && Boolean(formik.errors.role)}
              sx={{
                ...textFieldStyles,
                maxWidth: "calc(33.33% - 1.33rem)" // To match the width of one column in the 3-column grid
              }}
            >
              <InputLabel>Role</InputLabel>
              <Select
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                label="Role"
                sx={{
                  height: "50px",
                  fontSize: "14px",
                }}
              >
                {roleOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.role && formik.errors.role && (
                <FormHelperText>{formik.errors.role}</FormHelperText>
              )}
            </FormControl>

            {/* Address Field */}
            <TextField
              fullWidth
              name="address"
              label="Address"
              multiline
              rows={4}
              value={formik.values.address}
              onChange={formik.handleChange}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              placeholder="Enter Details"
              sx={{
                ...textFieldStyles,
                "& .MuiOutlinedInput-root": {
                  height: "auto",
                  fontSize: "14px",
                }
              }}
            />

            {/* Buttons */}
            <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: Colors.primary,
                  color: "white",
                  width: "120px",
                  fontSize: "14px",
                  "&:hover": {
                    bgcolor: Colors.primary,
                  },
                }}
              >
                Save
              </Button>
              <Button
                type="button"
                variant="contained"
                onClick={() => formik.resetForm()}
                sx={{
                  bgcolor: "#E2E8F0",
                  color: "black",
                  width: "120px",
                  fontSize: "14px",
                  "&:hover": {
                    bgcolor: "#CBD5E1",
                  },
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default RenderUserMaster; 