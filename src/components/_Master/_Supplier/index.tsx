import { Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Colors } from "../../../constants/Colors";
import { useAddSupplier } from "../../../hooks/masters/useAddSupplier";


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
  supplier_name: Yup.string().required("Name is required"),
  supplier_email: Yup.string()
    .email("Invalid email format")
    .required("Mail Id is required"),
  supplier_phone: Yup.string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  supplier_address: Yup.string().required("Address is required"),
  supplier_company: Yup.string().required("Company Name is required"),
});

const RenderSupplier = () => {

  const { mutate } = useAddSupplier();

  const formik = useFormik({
    initialValues: {
      supplier_name: "",
      supplier_email: "",
      supplier_phone: "",
      supplier_address: "",
      supplier_company: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      mutate(values, {
        onSuccess: () => {
          formik.resetForm();
        }
      })
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
          Supplier Master
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
              <TextField
                fullWidth
                name="supplier_name"
                label="Name"
                value={formik.values.supplier_name}
                onChange={formik.handleChange}
                error={formik.touched.supplier_name && Boolean(formik.errors.supplier_name)}
                helperText={formik.touched.supplier_name && formik.errors.supplier_name}
                placeholder="Enter name"
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                name="supplier_email"
                label="Mail Id"
                type="email"
                value={formik.values.supplier_email}
                onChange={formik.handleChange}
                error={formik.touched.supplier_email && Boolean(formik.errors.supplier_email)}
                helperText={formik.touched.supplier_email && formik.errors.supplier_email}
                placeholder="Enter email id"
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                name="supplier_phone"
                label="Phone Number"
                value={formik.values.supplier_phone}
                onChange={formik.handleChange}
                error={formik.touched.supplier_phone && Boolean(formik.errors.supplier_phone)}
                helperText={formik.touched.supplier_phone && formik.errors.supplier_phone}
                placeholder="Enter sub unit name"
                sx={textFieldStyles}
              />
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }}>

              <TextField
                fullWidth
                name="supplier_company"
                label="Componny Name"
                value={formik.values.supplier_company}
                onChange={formik.handleChange}
                error={formik.touched.supplier_company && Boolean(formik.errors.supplier_company)}
                helperText={formik.touched.supplier_company && formik.errors.supplier_company}
                placeholder="Enter compony name"
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                name="supplier_address"
                label="Compony Address"
                value={formik.values.supplier_address}
                onChange={formik.handleChange}
                error={formik.touched.supplier_address && Boolean(formik.errors.supplier_address)}
                helperText={formik.touched.supplier_address && formik.errors.supplier_address}
                placeholder="Enter address"
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
      </Box>
    </Box>
  );
};

export default RenderSupplier; 