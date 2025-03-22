import React from "react";
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Colors } from "../../constants/Colors";
import { useAddUser } from "../../hooks/masters/useAddUser";

// Sample data for role options
const roleOptions = [
  "Admin",
  "Manager",
  "Supervisor",
  "Staff",
  "technician"
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
  user_name: Yup.string().required("Name is required"),
  user_email: Yup.string()
    .email("Invalid email format")
    .required("Mail Id is required"),
  user_phone: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  user_role: Yup.string().required("Role is required"),
  user_address: Yup.string().required("Address is required")
});

const RenderUserMaster = () => {
  const addUserMutation = useAddUser();

  const formik = useFormik({
    initialValues: {
      user_name: "",
      user_email: "",
      user_phone: "",
      user_role: "",
      user_address: ""
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
        await addUserMutation.mutateAsync({
          ...values,
          successCB: () => {
            resetForm()
          }
        });

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
                name="user_name"
                label="Name"
                value={formik.values.user_name}
                onChange={formik.handleChange}
                error={formik.touched.user_name && Boolean(formik.errors.user_name)}
                helperText={formik.touched.user_name && formik.errors.user_name}
                placeholder="Enter name"
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                name="user_email"
                label="Mail Id"
                type="email"
                value={formik.values.user_email}
                onChange={formik.handleChange}
                error={formik.touched.user_email && Boolean(formik.errors.user_email)}
                helperText={formik.touched.user_email && formik.errors.user_email}
                placeholder="Enter email id"
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                name="user_phone"
                label="Phone Number"
                value={formik.values.user_phone}
                onChange={formik.handleChange}
                error={formik.touched.user_phone && Boolean(formik.errors.user_phone)}
                helperText={formik.touched.user_phone && formik.errors.user_phone}
                placeholder="Enter phone number"
                sx={textFieldStyles}
              />
            </Box>

            {/* Role Field */}
            <FormControl 
              error={formik.touched.user_role && Boolean(formik.errors.user_role)}
              sx={{
                ...textFieldStyles,
                maxWidth: "calc(33.33% - 1.33rem)" // To match the width of one column in the 3-column grid
              }}
            >
              <InputLabel>Role</InputLabel>
              <Select
                name="user_role"
                value={formik.values.user_role}
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
              {formik.touched.user_role && formik.errors.user_role && (
                <FormHelperText>{formik.errors.user_role}</FormHelperText>
              )}
            </FormControl>

            {/* Address Field */}
            <TextField
              fullWidth
              name="user_address"
              label="Address"
              multiline
              rows={4}
              value={formik.values.user_address}
              onChange={formik.handleChange}
              error={formik.touched.user_address && Boolean(formik.errors.user_address)}
              helperText={formik.touched.user_address && formik.errors.user_address}
              placeholder="Enter address"
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
                disabled={addUserMutation.isPending}
                sx={{
                  bgcolor: Colors.primary,
                  color: "white",
                  width: "120px",
                  fontSize: "14px",
                  "&:hover": {
                    bgcolor: "#1D434C",
                  },
                }}
              >
                {addUserMutation.isPending ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="contained"
                onClick={() => formik.resetForm()}
                disabled={addUserMutation.isPending}
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