import React from "react";
import { Box, Typography, Autocomplete, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Colors } from "../../constants/Colors";

// Sample data for dropdowns
const productOptions = [
  "Hikvision 5MP CCTV Camera",
  "Camera Cable",
  "DVR System",
  "Security Sensor"
];

const categoryOptions = [
  "CCTV",
  "Security Systems",
  "Networking",
  "Accessories"
];

const unitOptions = [
  "NOS",
  "MTR",
  "KG",
  "SET"
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
  "& .MuiAutocomplete-input": {
    padding: "0px 14px !important",
    fontSize: "14px !important",
  },
  "& .MuiFormHelperText-root": {
    fontSize: "12px",
    marginTop: "2px"
  },
  "& input::placeholder": {
    fontSize: "14px"
  },
  "& .MuiAutocomplete-option": {
    fontSize: "14px"
  }
};

const validationSchema = Yup.object({
  productName: Yup.string().required("Product Name is required"),
  category: Yup.string().required("Category is required"),
  unit: Yup.string().required("Unit is required"),
  unitPrice: Yup.number()
    .required("Unit Price is required")
    .min(0, "Price must be positive"),
  lowStockQuantity: Yup.number()
    .required("Low Stock Quantity is required")
    .min(0, "Quantity must be positive")
});

const RenderProduct = () => {
  const formik = useFormik({
    initialValues: {
      productName: "",
      category: "",
      unit: "",
      unitPrice: "",
      lowStockQuantity: ""
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
        minHeight: "calc(100vh - 96px)", // Subtracting header heights
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
          Product Master
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
              {/* Product Name */}
              <Autocomplete
                freeSolo
                options={productOptions}
                value={formik.values.productName}
                onChange={(_, newValue) => {
                  formik.setFieldValue("productName", newValue || "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={textFieldStyles}
                    label="Product Name"
                    error={formik.touched.productName && Boolean(formik.errors.productName)}
                    helperText={formik.touched.productName && formik.errors.productName}
                    placeholder="Select product"
                  />
                )}
              />

              {/* Category */}
              <Autocomplete
                freeSolo
                options={categoryOptions}
                value={formik.values.category}
                onChange={(_, newValue) => {
                  formik.setFieldValue("category", newValue || "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={textFieldStyles}
                    label="Category"
                    error={formik.touched.category && Boolean(formik.errors.category)}
                    helperText={formik.touched.category && formik.errors.category}
                    placeholder="Select Category"
                  />
                )}
              />

              {/* Unit */}
              <Autocomplete
                freeSolo
                options={unitOptions}
                value={formik.values.unit}
                onChange={(_, newValue) => {
                  formik.setFieldValue("unit", newValue || "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    sx={textFieldStyles}
                    label="Unit"
                    error={formik.touched.unit && Boolean(formik.errors.unit)}
                    helperText={formik.touched.unit && formik.errors.unit}
                    placeholder="Select Unit"
                  />
                )}
              />
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }}>
              {/* Unit Price */}
              <TextField
                fullWidth
                name="unitPrice"
                label="Unit Price"
                type="number"
                value={formik.values.unitPrice}
                onChange={formik.handleChange}
                error={formik.touched.unitPrice && Boolean(formik.errors.unitPrice)}
                helperText={formik.touched.unitPrice && formik.errors.unitPrice}
                placeholder="Enter price"
                sx={textFieldStyles}
              />

              {/* Low Stock Quantity */}
              <TextField
                fullWidth
                name="lowStockQuantity"
                label="Low Stock Quantity"
                type="number"
                value={formik.values.lowStockQuantity}
                onChange={formik.handleChange}
                error={formik.touched.lowStockQuantity && Boolean(formik.errors.lowStockQuantity)}
                helperText={formik.touched.lowStockQuantity && formik.errors.lowStockQuantity}
                placeholder="Enter stock"
                sx={textFieldStyles}
              />
            </Box>

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
                    bgcolor: "#1D434C",
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

export default RenderProduct; 