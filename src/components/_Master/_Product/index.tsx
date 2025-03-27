import { Box, Typography, TextField, Button, Autocomplete } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Colors } from "../../../constants/Colors";
import { useAddProduct } from "../../../hooks/masters/useAddProduct";
import { useGetAllCategories } from "../../../hooks/masters/useGetAllCategories";
import Spinner from "../../utilities/Spinner";

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
  product_name: Yup.string().required("Product Name is required"),
  product_category: Yup.string().required("Category is required"),
  waranty_period: Yup.string().required("Waranty Period is required"),
  unit: Yup.string().required("Unit is required"),
  unit_price: Yup.number()
    .required("Unit Price is required")
    .min(0, "Price must be positive"),
  low_stock_quantity: Yup.number()
    .required("Low Stock Quantity is required")
    .min(0, "Quantity must be positive"),
  HSN_code: Yup.string().required("HSN code is required"),
  product_description: Yup.string().required("Product Description is required"),
});

const RenderProduct = () => {

  const { data, isLoading } = useGetAllCategories();

  const { mutate } = useAddProduct();

  const formik = useFormik({
    initialValues: {
      product_name: "",
      product_category: "",
      waranty_period: "",
      unit: "",
      unit_price: "",
      low_stock_quantity: "",
      HSN_code: "",
      product_description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          formik.resetForm();
        }
      });
    }
  });

  const handleCategoryChange = (event: any, newValue: string | null) => {
    const selectedProduct = data.find((p: any) => p.category_name === newValue);
    if (selectedProduct) {
      formik.setFieldValue("product_category", selectedProduct.category_name || "");
    } else {
      formik.setFieldValue("product_category", "");
    }
  };

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
          Product Master
        </Typography>

        {
          isLoading ? <Spinner />
            : <form onSubmit={formik.handleSubmit}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
                  <TextField
                    fullWidth
                    name="product_name"
                    label="Product Name"
                    type="text"
                    value={formik.values.product_name}
                    onChange={formik.handleChange}
                    error={formik.touched.product_name && Boolean(formik.errors.product_name)}
                    helperText={formik.touched.product_name && formik.errors.product_name}
                    placeholder="Enter name"
                    sx={textFieldStyles}
                  />

                  <Autocomplete
                    freeSolo
                    options={data.map((p: any) => p.category_name)}
                    value={formik.values.product_category}
                    onChange={handleCategoryChange}
                    ListboxProps={{
                      sx: {
                        maxHeight: "200px",
                        overflowY: "auto",
                        "& .MuiAutocomplete-option": {
                          fontSize: "12px",
                          padding: "6px 12px",
                        },
                      },
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        sx={textFieldStyles}
                        label="Product Category"
                        error={formik.touched.product_category && Boolean(formik.errors.product_category)}
                        helperText={formik.touched.product_category && formik.errors.product_category}
                        placeholder="Select Category"
                      />
                    )}
                    loading={isLoading}
                  />

                  <TextField
                    fullWidth
                    name="waranty_period"
                    label="Waranty Period"
                    type="text"
                    value={formik.values.waranty_period}
                    onChange={formik.handleChange}
                    error={formik.touched.waranty_period && Boolean(formik.errors.waranty_period)}
                    helperText={formik.touched.waranty_period && formik.errors.waranty_period}
                    placeholder="Enter waranty period"
                    sx={textFieldStyles}
                  />
                </Box>

                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>

                  <TextField
                    fullWidth
                    name="unit"
                    label="Unit"
                    type="text"
                    value={formik.values.unit}
                    onChange={formik.handleChange}
                    error={formik.touched.unit && Boolean(formik.errors.unit)}
                    helperText={formik.touched.unit && formik.errors.unit}
                    placeholder="Enter Unit"
                    sx={textFieldStyles}
                  />

                  <TextField
                    fullWidth
                    name="unit_price"
                    label="Unit Price"
                    type="number"
                    value={formik.values.unit_price}
                    onChange={formik.handleChange}
                    error={formik.touched.unit_price && Boolean(formik.errors.unit_price)}
                    helperText={formik.touched.unit_price && formik.errors.unit_price}
                    placeholder="Enter price"
                    sx={textFieldStyles}
                  />

                  <TextField
                    fullWidth
                    name="low_stock_quantity"
                    label="Low Stock Quantity"
                    type="number"
                    value={formik.values.low_stock_quantity}
                    onChange={formik.handleChange}
                    error={formik.touched.low_stock_quantity && Boolean(formik.errors.low_stock_quantity)}
                    helperText={formik.touched.low_stock_quantity && formik.errors.low_stock_quantity}
                    placeholder="Enter stock"
                    sx={textFieldStyles}
                  />
                </Box>

                <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }}>

                  <TextField
                    fullWidth
                    name="HSN_code"
                    label="HSN Code"
                    type="text"
                    value={formik.values.HSN_code}
                    onChange={formik.handleChange}
                    error={formik.touched.HSN_code && Boolean(formik.errors.HSN_code)}
                    helperText={formik.touched.HSN_code && formik.errors.unit_price}
                    placeholder="Enter HSN code"
                    sx={textFieldStyles}
                  />

                  <TextField
                    fullWidth
                    name="product_description"
                    label="Product Description"
                    type="text"
                    value={formik.values.product_description}
                    onChange={formik.handleChange}
                    error={formik.touched.product_description && Boolean(formik.errors.product_description)}
                    helperText={formik.touched.product_description && formik.errors.product_description}
                    placeholder="Enter description"
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
        }
      </Box>
    </Box>
  );
};

export default RenderProduct; 