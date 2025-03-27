import { Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Colors } from "../../../constants/Colors";
import { useAddCategory } from "../../../hooks/masters/useAddCategory";

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
    category_name: Yup.string().required("Name is required"),
});

const RenderCategory = () => {

    const { mutate } = useAddCategory();

    const formik = useFormik({
        initialValues: {
            category_name: ""
        },
        validationSchema,
        onSubmit: (values) => {
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
                    Category Master
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }}>
                            <TextField
                                fullWidth
                                name="category_name"
                                label="Category Name"
                                value={formik.values.category_name}
                                onChange={formik.handleChange}
                                error={formik.touched.category_name && Boolean(formik.errors.category_name)}
                                helperText={formik.touched.category_name && formik.errors.category_name}
                                placeholder="Enter name"
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

export default RenderCategory; 