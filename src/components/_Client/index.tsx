import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Colors } from "../../constants/Colors";
import { useAddClient } from "../../hooks/masters/useAddClient";

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
  client_name: Yup.string().required("Name of client is required"),
  client_company: Yup.string().required("Company Name is required"),
  client_email: Yup.string()
    .email("Invalid email format")
    .required("Mail Id is required"),
  client_phone: Yup.string()
    .required("Contact Number is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  client_address: Yup.string().required("Address is required"),
  mapLink: Yup.string().required("Map Link is required")
});

const RenderClient = () => {
  const addClientMutation = useAddClient();

  const formik = useFormik({
    initialValues: {
      client_name: "",
      client_company: "",
      client_email: "",
      client_phone: "",
      client_address: "",
      mapLink: ""
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
        addClientMutation.mutateAsync({...values,successCB: () => resetForm() });

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
          Client Master
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* First Row */}
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
              <TextField
                fullWidth
                name="client_name"
                label="Name of client"
                value={formik.values.client_name}
                onChange={formik.handleChange}
                error={formik.touched.client_name && Boolean(formik.errors.client_name)}
                helperText={formik.touched.client_name && formik.errors.client_name}
                placeholder="Enter name"
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                name="client_company"
                label="Company Name"
                value={formik.values.client_company}
                onChange={formik.handleChange}
                error={formik.touched.client_company && Boolean(formik.errors.client_company)}
                helperText={formik.touched.client_company && formik.errors.client_company}
                placeholder="Enter company name"
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                name="client_phone"
                label="Contact Number"
                value={formik.values.client_phone}
                onChange={formik.handleChange}
                error={formik.touched.client_phone && Boolean(formik.errors.client_phone)}
                helperText={formik.touched.client_phone && formik.errors.client_phone}
                placeholder="Enter number"
                sx={textFieldStyles}
              />
            </Box>

            {/* Second Row */}
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
              <TextField
                fullWidth
                name="client_email"
                label="Mail Id"
                type="email"
                value={formik.values.client_email}
                onChange={formik.handleChange}
                error={formik.touched.client_email && Boolean(formik.errors.client_email)}
                helperText={formik.touched.client_email && formik.errors.client_email}
                placeholder="Enter email id"
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                name="client_address"
                label="Address"
                value={formik.values.client_address}
                onChange={formik.handleChange}
                error={formik.touched.client_address && Boolean(formik.errors.client_address)}
                helperText={formik.touched.client_address && formik.errors.client_address}
                placeholder="Enter complete address"
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                name="mapLink"
                label="Map Link"
                value={formik.values.mapLink}
                onChange={formik.handleChange}
                error={formik.touched.mapLink && Boolean(formik.errors.mapLink)}
                helperText={formik.touched.mapLink && formik.errors.mapLink}
                placeholder="Enter Map Link"
                sx={textFieldStyles}
              />
            </Box>

            {/* Buttons */}
            <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                disabled={addClientMutation.isPending}
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
                {addClientMutation.isPending ? "Saving..." : "Save"}
              </Button>
              <Button
                type="button"
                variant="contained"
                onClick={() => formik.resetForm()}
                disabled={addClientMutation.isPending}
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

export default RenderClient; 