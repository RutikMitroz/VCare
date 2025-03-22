import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import {
    Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Colors } from "../../../../constants/Colors";

interface Product {
    srNo: string;
    product: string;
    quantity: number | "";
    unit: string;
    rate: number | "";
    amount: number | "";
    taxPercent: number | "";
}

interface Invoice {
    products: Product[];
    discountPercent: number | "";
}

interface CreateInvoiceFormProps {
    setFlag: (isCreating: boolean) => void;
}

const validationSchema = Yup.object({
    products: Yup.array()
        .of(
            Yup.object({
                srNo: Yup.string().required("Sr. No. is required"),
                product: Yup.string().required("Product is required"),
                quantity: Yup.number()
                    .required("Quantity is required")
                    .min(1, "Quantity must be at least 1"),
                unit: Yup.string().required("Unit is required"),
                rate: Yup.number()
                    .required("Rate is required")
                    .min(0, "Rate cannot be negative"),
                amount: Yup.number()
                    .required("Amount is required")
                    .min(0, "Amount cannot be negative"),
                taxPercent: Yup.number()
                    .required("Tax % is required")
                    .min(0, "Tax % cannot be negative")
                    .max(100, "Tax % cannot exceed 100"),
            })
        )
        .min(1, "At least one product is required"),
    discountPercent: Yup.number()
        .required("Discount % is required")
        .min(0, "Discount % cannot be negative")
        .max(100, "Discount % cannot exceed 100"),
});

const CreateInvoiceForm: React.FC<CreateInvoiceFormProps> = ({ setFlag }) => {
    const initialValues: Invoice = {
        products: [
            {
                srNo: "#0001",
                product: "Hikvision 5MP CCTV Camera",
                quantity: 6,
                unit: "NOS",
                rate: 2000,
                amount: 12000,
                taxPercent: 18,
            },
        ],
        discountPercent: 10,
    };

    const calculateTotals = (products: Product[], discountPercent: number | "") => {
        const totalAmount = products.reduce((sum, product) => {
            const qty = Number(product.quantity) || 0;
            const rate = Number(product.rate) || 0;
            return sum + qty * rate;
        }, 0);

        const taxableAmount = products.reduce((sum, product) => {
            const qty = Number(product.quantity) || 0;
            const rate = Number(product.rate) || 0;
            const taxPercent = Number(product.taxPercent) || 0;
            return sum + (qty * rate * taxPercent) / 100;
        }, 0);

        const discountAmount =
            ((totalAmount + taxableAmount) * (Number(discountPercent) || 0)) / 100;

        const netAmount = totalAmount + taxableAmount - discountAmount;

        return { totalAmount, taxableAmount, discountAmount, netAmount };
    };

    return (
        <Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "16px",
                }}
            >
                <Typography sx={{ fontSize: 18, fontWeight: "bold", color: "#424242" }}>
                    Invoice
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: Colors.primary,
                            color: "#FFFFFF",
                            borderRadius: "8px",
                            padding: "8px 16px",
                            textTransform: "capitalize",
                            fontSize: "14px",
                            fontWeight: "bold",
                            height: "2.5rem",
                            "&:hover": {
                                backgroundColor: "#004D40",
                            },
                        }}
                    >
                        Preview
                    </Button>
                </Box>
            </Box>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log("Form Values:", values);
                    setFlag(false);
                }}
            >
                {({ values, errors, touched }) => {
                    const { totalAmount, taxableAmount, discountAmount, netAmount } = calculateTotals(
                        values.products,
                        values.discountPercent
                    );

                    return (
                        <Form>
                            <FieldArray name="products">
                                {({ push, remove }) => (
                                    <>
                                        <TableContainer sx={{ bgcolor: "#FFFFFF", borderRadius: 2, mb: 3 }}>
                                            <Table>
                                                <TableHead>
                                                    <TableRow sx={{ bgcolor: Colors.primary }}>
                                                        {["Sr. No.", "Products", "Qty.", "Unit", "Rate", "Amount", "Tax %", "Action"].map((header) => (
                                                            <TableCell
                                                                key={header}
                                                                sx={{
                                                                    color: "#FFFFFF",
                                                                    fontSize: "14px",
                                                                    textTransform: "capitalize",
                                                                    fontWeight: "bold",
                                                                    padding: "12px",
                                                                }}
                                                            >
                                                                {header}
                                                            </TableCell>
                                                        ))}
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {values.products.map((product, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell sx={{ padding: "8px" }}>
                                                                <Field
                                                                    as={TextField}
                                                                    name={`products[${index}].srNo`}
                                                                    size="small"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    sx={{
                                                                        "& .MuiInputBase-root": {
                                                                            fontSize: "14px",
                                                                            borderRadius: "8px",
                                                                        },
                                                                    }}
                                                                    error={
                                                                        touched.products?.[index]?.srNo && !!errors.products?.[index]?.srNo
                                                                    }
                                                                    helperText={
                                                                        touched.products?.[index]?.srNo && errors.products?.[index]?.srNo ? (
                                                                            <Typography sx={{ color: "red", fontSize: "12px" }}>
                                                                                {errors.products[index].srNo}
                                                                            </Typography>
                                                                        ) : null
                                                                    }
                                                                />
                                                            </TableCell>
                                                            <TableCell sx={{ padding: "8px" }}>
                                                                <Field
                                                                    as={TextField}
                                                                    name={`products[${index}].product`}
                                                                    size="small"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    sx={{
                                                                        "& .MuiInputBase-root": {
                                                                            fontSize: "14px",
                                                                            borderRadius: "8px",
                                                                        },
                                                                    }}
                                                                    error={
                                                                        touched.products?.[index]?.product &&
                                                                        !!errors.products?.[index]?.product
                                                                    }
                                                                    helperText={
                                                                        touched.products?.[index]?.product &&
                                                                            errors.products?.[index]?.product ? (
                                                                            <Typography sx={{ color: "red", fontSize: "12px" }}>
                                                                                {errors.products[index].product}
                                                                            </Typography>
                                                                        ) : null
                                                                    }
                                                                />
                                                            </TableCell>
                                                            <TableCell sx={{ padding: "8px" }}>
                                                                <Field
                                                                    as={TextField}
                                                                    name={`products[${index}].quantity`}
                                                                    type="number"
                                                                    size="small"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    sx={{
                                                                        "& .MuiInputBase-root": {
                                                                            fontSize: "14px",
                                                                            borderRadius: "8px",
                                                                        },
                                                                    }}
                                                                    error={
                                                                        touched.products?.[index]?.quantity &&
                                                                        !!errors.products?.[index]?.quantity
                                                                    }
                                                                    helperText={
                                                                        touched.products?.[index]?.quantity &&
                                                                            errors.products?.[index]?.quantity ? (
                                                                            <Typography sx={{ color: "red", fontSize: "12px" }}>
                                                                                {errors.products[index].quantity}
                                                                            </Typography>
                                                                        ) : null
                                                                    }
                                                                />
                                                            </TableCell>
                                                            <TableCell sx={{ padding: "8px" }}>
                                                                <Field
                                                                    as={TextField}
                                                                    name={`products[${index}].unit`}
                                                                    size="small"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    sx={{
                                                                        "& .MuiInputBase-root": {
                                                                            fontSize: "14px",
                                                                            borderRadius: "8px",
                                                                        },
                                                                    }}
                                                                    error={
                                                                        touched.products?.[index]?.unit && !!errors.products?.[index]?.unit
                                                                    }
                                                                    helperText={
                                                                        touched.products?.[index]?.unit && errors.products?.[index]?.unit ? (
                                                                            <Typography sx={{ color: "red", fontSize: "12px" }}>
                                                                                {errors.products[index].unit}
                                                                            </Typography>
                                                                        ) : null
                                                                    }
                                                                />
                                                            </TableCell>
                                                            <TableCell sx={{ padding: "8px" }}>
                                                                <Field
                                                                    as={TextField}
                                                                    name={`products[${index}].rate`}
                                                                    type="number"
                                                                    size="small"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    sx={{
                                                                        "& .MuiInputBase-root": {
                                                                            fontSize: "14px",
                                                                            borderRadius: "8px",
                                                                        },
                                                                    }}
                                                                    error={
                                                                        touched.products?.[index]?.rate && !!errors.products?.[index]?.rate
                                                                    }
                                                                    helperText={
                                                                        touched.products?.[index]?.rate && errors.products?.[index]?.rate ? (
                                                                            <Typography sx={{ color: "red", fontSize: "12px" }}>
                                                                                {errors.products[index].rate}
                                                                            </Typography>
                                                                        ) : null
                                                                    }
                                                                />
                                                            </TableCell>
                                                            <TableCell sx={{ padding: "8px" }}>
                                                                <Field
                                                                    as={TextField}
                                                                    name={`products[${index}].amount`}
                                                                    type="number"
                                                                    size="small"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    sx={{
                                                                        "& .MuiInputBase-root": {
                                                                            fontSize: "14px",
                                                                            borderRadius: "8px",
                                                                        },
                                                                    }}
                                                                    error={
                                                                        touched.products?.[index]?.amount && !!errors.products?.[index]?.amount
                                                                    }
                                                                    helperText={
                                                                        touched.products?.[index]?.amount && errors.products?.[index]?.amount ? (
                                                                            <Typography sx={{ color: "red", fontSize: "12px" }}>
                                                                                {errors.products[index].amount}
                                                                            </Typography>
                                                                        ) : null
                                                                    }
                                                                />
                                                            </TableCell>
                                                            <TableCell sx={{ padding: "8px" }}>
                                                                <Field
                                                                    as={TextField}
                                                                    name={`products[${index}].taxPercent`}
                                                                    type="number"
                                                                    size="small"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    sx={{
                                                                        "& .MuiInputBase-root": {
                                                                            fontSize: "14px",
                                                                            borderRadius: "8px",
                                                                        },
                                                                    }}
                                                                    error={
                                                                        touched.products?.[index]?.taxPercent &&
                                                                        !!errors.products?.[index]?.taxPercent
                                                                    }
                                                                    helperText={
                                                                        touched.products?.[index]?.taxPercent &&
                                                                            errors.products?.[index]?.taxPercent ? (
                                                                            <Typography sx={{ color: "red", fontSize: "12px" }}>
                                                                                {errors.products[index].taxPercent}
                                                                            </Typography>
                                                                        ) : null
                                                                    }
                                                                />
                                                            </TableCell>
                                                            <TableCell sx={{ padding: "8px" }}>
                                                                <IconButton
                                                                    onClick={() => remove(index)}
                                                                    sx={{
                                                                        backgroundColor: "#FF0000",
                                                                        color: "#FFFFFF",
                                                                        "&:hover": {
                                                                            backgroundColor: "#CC0000",
                                                                        },
                                                                    }}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                    <TableRow>
                                                        <TableCell colSpan={8} sx={{ textAlign: "right", padding: "8px", paddingRight: "22px" }}>
                                                            <IconButton
                                                                onClick={() =>
                                                                    push({
                                                                        srNo: `#${(values.products.length + 1).toString().padStart(4, "0")}`,
                                                                        product: "",
                                                                        quantity: "",
                                                                        unit: "",
                                                                        rate: "",
                                                                        taxPercent: "",
                                                                    })
                                                                }
                                                                sx={{
                                                                    backgroundColor: "#2196F3",
                                                                    color: "#FFFFFF",
                                                                    "&:hover": {
                                                                        backgroundColor: "#1976D2",
                                                                    },
                                                                }}
                                                            >
                                                                <AddIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                        <Grid container spacing={2} sx={{ mb: 3 }}>
                                            <Grid item xs={12} sm={2.4}>
                                                <TextField
                                                    label="Total Amount"
                                                    sx={{
                                                        backgroundColor: "#FFFFFF",
                                                        "& .MuiInputBase-root": {
                                                            fontSize: "14px",
                                                            borderRadius: "8px",
                                                        },
                                                    }}
                                                    value={totalAmount.toLocaleString()}
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                    InputProps={{ readOnly: true }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={2.4}>
                                                <TextField
                                                    label="Taxable Amount"
                                                    sx={{
                                                        backgroundColor: "#FFFFFF",
                                                        "& .MuiInputBase-root": {
                                                            fontSize: "14px",
                                                            borderRadius: "8px",
                                                        },
                                                    }}
                                                    value={taxableAmount.toLocaleString()}
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                    InputProps={{ readOnly: true }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={2.4}>
                                                <Field
                                                    as={TextField}
                                                    label="Discount Percent"
                                                    sx={{
                                                        backgroundColor: "#FFFFFF",
                                                        "& .MuiInputBase-root": {
                                                            fontSize: "14px",
                                                            borderRadius: "8px",
                                                        },
                                                    }}
                                                    name="discountPercent"
                                                    type="number"
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                    error={touched.discountPercent && !!errors.discountPercent}
                                                    helperText={
                                                        touched.discountPercent && errors.discountPercent ? (
                                                            <Typography sx={{ color: "red", fontSize: "12px" }}>
                                                                {errors.discountPercent}
                                                            </Typography>
                                                        ) : null
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={2.4}>
                                                <TextField
                                                    label="Discount Amount"
                                                    sx={{
                                                        backgroundColor: "#FFFFFF",
                                                        "& .MuiInputBase-root": {
                                                            fontSize: "14px",
                                                            borderRadius: "8px",
                                                        },
                                                    }}
                                                    value={discountAmount.toLocaleString()}
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                    InputProps={{ readOnly: true }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={2.4}>
                                                <TextField
                                                    label="Net Amount"
                                                    sx={{
                                                        backgroundColor: "#FFFFFF",
                                                        "& .MuiInputBase-root": {
                                                            fontSize: "14px",
                                                            borderRadius: "8px",
                                                        },
                                                    }}
                                                    value={netAmount.toLocaleString()}
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                    InputProps={{ readOnly: true }}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: Colors.primary,
                                                    color: "#FFFFFF",
                                                    borderRadius: "8px",
                                                    padding: "8px 24px",
                                                    textTransform: "capitalize",
                                                    fontSize: "14px",
                                                    fontWeight: "bold",
                                                    "&:hover": {
                                                        backgroundColor: "#004D40",
                                                    },
                                                }}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                onClick={() => setFlag(true)}
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: "#E0E0E0",
                                                    color: "#424242",
                                                    borderRadius: "8px",
                                                    padding: "8px 24px",
                                                    textTransform: "capitalize",
                                                    fontSize: "14px",
                                                    fontWeight: "bold",
                                                    "&:hover": {
                                                        backgroundColor: "#B0BEC5",
                                                    },
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </Box>
                                    </>
                                )}
                            </FieldArray>
                        </Form>
                    );
                }}
            </Formik>
        </Box>
    );
};

export default CreateInvoiceForm;