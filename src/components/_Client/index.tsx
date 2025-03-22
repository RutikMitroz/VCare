import { Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Colors } from "../../constants/Colors";

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
  clientName: Yup.string().required("Name of client is required"),
  companyName: Yup.string().required("Company Name is required"),
  subUnitName: Yup.string().required("Sub Unit Name is required"),
  contactNumber: Yup.string()
    .required("Contact Number is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Mail Id is required"),
  address: Yup.string().required("Address is required")
});

const RenderClient = () => {
  const formik = useFormik({
    initialValues: {
      clientName: "",
      companyName: "",
      subUnitName: "",
      contactNumber: "",
      email: "",
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
          Client Master
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {/* First Row */}
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
              <TextField
                fullWidth
                name="clientName"
                label="Name of client"
                value={formik.values.clientName}
                onChange={formik.handleChange}
                error={formik.touched.clientName && Boolean(formik.errors.clientName)}
                helperText={formik.touched.clientName && formik.errors.clientName}
                placeholder="Enter name"
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                name="companyName"
                label="Company Name"
                value={formik.values.companyName}
                onChange={formik.handleChange}
                error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                helperText={formik.touched.companyName && formik.errors.companyName}
                placeholder="Enter company name"
                sx={textFieldStyles}
              />

              <TextField
                fullWidth
                name="subUnitName"
                label="Sub Unit Name"
                value={formik.values.subUnitName}
                onChange={formik.handleChange}
                error={formik.touched.subUnitName && Boolean(formik.errors.subUnitName)}
                helperText={formik.touched.subUnitName && formik.errors.subUnitName}
                placeholder="Enter sub unit name"
                sx={textFieldStyles}
              />
            </Box>

            {/* Second Row */}
            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }}>
              <TextField
                fullWidth
                name="contactNumber"
                label="Contact Number"
                value={formik.values.contactNumber}
                onChange={formik.handleChange}
                error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                placeholder="Enter number"
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
            </Box>

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

export default RenderClient; 