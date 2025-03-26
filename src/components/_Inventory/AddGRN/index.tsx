import { Box, Typography, Autocomplete, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Colors } from "../../../constants/Colors";
import { useGetProducts } from "../../../hooks/enquiry/useGetAllProducts";
import { useAddGRN } from "../../../hooks/inventory/useAddGRN";

// Define the type for form values
interface FormValues {
    productId: string;
    productName: string;
    category: string;
    unit: string;
    product_barcode: string;
    purchased_price: string;
}

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
        },
    },
    "& .MuiAutocomplete-input": {
        padding: "0px 14px !important",
        fontSize: "14px !important",
    },
    "& .MuiFormHelperText-root": {
        fontSize: "12px",
        marginTop: "2px",
    },
    "& input::placeholder": {
        fontSize: "14px",
    },
    "& .MuiAutocomplete-option": {
        fontSize: "14px",
    },
};

const validationSchema = Yup.object({
    productName: Yup.string().required("Product Name is required"),
    category: Yup.string().required("Category is required"),
    unit: Yup.string().required("Unit is required"),
    purchased_price: Yup.number() // Match field name with initialValues
        .required("Purchased Price is required")
        .min(0, "Price must be positive"),
});

const RenderAddGRN = () => {
    const { data, isLoading } = useGetProducts({
        page: 0,
        limit: 0,
        search: "",
    });

    const { mutate, isLoading: mutationLoading } = useAddGRN();

    const products = data?.data || [];

    const handleSubmit = (values: FormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        mutate(
            {
                product_id: values.productId,
                product_barcode: values.product_barcode,
                purchased_price: values.purchased_price,
            },
            {
                onSuccess: () => {
                    formik.resetForm();
                },
                onError: (error: any) => {
                    console.error("Error adding GRN:", error);
                },
            }
        );
        setSubmitting(false); 
    };

    const formik = useFormik({
        initialValues: {
            productId: "",
            productName: "",
            category: "",
            unit: "",
            product_barcode: "",
            purchased_price: "",
        },
        validationSchema,
        onSubmit: handleSubmit,
    });

    const handleProductChange = (event: any, newValue: string | null) => {
        const selectedProduct = products.find((p: any) => p.product_name === newValue);
        if (selectedProduct) {
            formik.setFieldValue("productId", selectedProduct._id || "");
            formik.setFieldValue("productName", selectedProduct.product_name || "");
            formik.setFieldValue("category", selectedProduct.product_category || "");
            formik.setFieldValue("unit", selectedProduct.unit || "");
        } else {
            formik.setFieldValue("productId", "");
            formik.setFieldValue("productName", newValue || "");
            formik.setFieldValue("category", "");
            formik.setFieldValue("unit", "");
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
                    ADD GRN
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
                            <Autocomplete
                                freeSolo
                                options={products.map((p) => p.product_name)}
                                value={formik.values.productName}
                                onChange={handleProductChange}
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
                                        label="Product Name"
                                        error={formik.touched.productName && Boolean(formik.errors.productName)}
                                        helperText={formik.touched.productName && formik.errors.productName}
                                        placeholder="Select product"
                                    />
                                )}
                                loading={isLoading}
                            />

                            <TextField
                                fullWidth
                                name="category"
                                label="Category"
                                disabled
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                error={formik.touched.category && Boolean(formik.errors.category)}
                                helperText={formik.touched.category && formik.errors.category}
                                placeholder="Category will be auto-filled"
                                sx={textFieldStyles}
                                InputProps={{ readOnly: true }}
                            />

                            <TextField
                                fullWidth
                                name="unit"
                                label="Unit"
                                disabled
                                value={formik.values.unit}
                                onChange={formik.handleChange}
                                error={formik.touched.unit && Boolean(formik.errors.unit)}
                                helperText={formik.touched.unit && formik.errors.unit}
                                placeholder="Unit will be auto-filled"
                                sx={textFieldStyles}
                                InputProps={{ readOnly: true }}
                            />
                        </Box>

                        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2rem" }}>
                            <TextField
                                fullWidth
                                name="product_barcode"
                                label="Barcode"
                                value={formik.values.product_barcode}
                                onChange={formik.handleChange}
                                error={formik.touched.product_barcode && Boolean(formik.errors.product_barcode)}
                                helperText={formik.touched.product_barcode && formik.errors.product_barcode}
                                placeholder="Enter barcode"
                                sx={textFieldStyles}
                            />

                            <TextField
                                fullWidth
                                name="purchased_price"
                                label="Purchased Price"
                                type="number"
                                value={formik.values.purchased_price}
                                onChange={formik.handleChange}
                                error={formik.touched.purchased_price && Boolean(formik.errors.purchased_price)}
                                helperText={formik.touched.purchased_price && formik.errors.purchased_price}
                                placeholder="Enter price"
                                sx={textFieldStyles}
                            />
                        </Box>

                        <Box sx={{ display: "flex", gap: "1rem", justifyContent: "center", mt: 2 }}>
                            <Button
                                type="submit" // Use type="submit" to trigger formik.handleSubmit
                                variant="contained"
                                disabled={mutationLoading || formik.isSubmitting} // Disable during submission
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
                                {mutationLoading ? "Saving..." : "Save"}
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

export default RenderAddGRN;