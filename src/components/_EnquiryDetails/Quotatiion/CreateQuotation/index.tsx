import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import {
    Box, Typography, TextField, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, IconButton, Grid, Autocomplete,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { Colors } from "../../../../constants/Colors";
import { useGetProducts } from "../../../../hooks/enquiry/useGetAllProducts";
import { useState, useEffect } from "react";
import useDebounce from "../../../../hooks/utilities/useDebounceFunc";
import { useAddQuotation } from "../../../../hooks/enquiry/useAddQuotation";
import { useQueryClient } from "@tanstack/react-query";

interface Product {
    _id: string;
    product_name: string;
    unit: string;
    product_price: number | "";
}

interface Quotation {
    products: Product[];
    discountPercent: number | "";
}

interface CreateQuotationFormProps {
    setFlag: (isCreating: boolean) => void;
    enquiryId: string;
    clientId: string;
}

const validationSchema = Yup.object({
    products: Yup.array()
        .of(
            Yup.object({
                _id: Yup.string().required("Sr. No. is required"),
                product_name: Yup.string().required("Product name is required"),
                unit: Yup.string().required("Unit is required"),
                product_price: Yup.number()
                    .required("Product price is required")
                    .min(0, "Product price cannot be negative"),
            })
        )
        .min(1, "At least one product is required"),
    discountPercent: Yup.number()
        .required("Discount % is required")
        .min(0, "Discount % cannot be negative")
        .max(100, "Discount % cannot exceed 100"),
});

const CreateQuotationForm: React.FC<CreateQuotationFormProps> = ({ setFlag, enquiryId, clientId }) => {
    const initialValues: Quotation = {
        products: [],
        discountPercent: 0,
    };

    const queryClient = useQueryClient();

    const [searchStates, setSearchStates] = useState<string[]>([]);
    const [allProducts, setAllProducts] = useState<Product[]>([]);

    const updateSearchState = (index: number, value: string) => {
        setSearchStates((prev) => {
            const newStates = [...prev];
            newStates[index] = value;
            return newStates;
        });
    };

    const { mutate } = useAddQuotation();

    const { data: productsData, isLoading } = useGetProducts("");
    useEffect(() => {
        if (productsData) {
            setAllProducts(productsData);
        }
    }, [productsData]);

    const debouncedSetSearch = useDebounce((index: number, value: string) => {
        updateSearchState(index, value);
    }, 750);

    const calculateTotals = (products: Product[], discountPercent: number | "") => {
        const totalAmount = products.reduce((sum, product) => {
            const product_price = Number(product.product_price) || 0;
            return sum + product_price;
        }, 0);

        const taxableAmount = 0;

        const discountAmount =
            ((totalAmount + taxableAmount) * (Number(discountPercent) || 0)) / 100;

        const netAmount = totalAmount + taxableAmount - discountAmount;

        return { totalAmount, taxableAmount, discountAmount, netAmount };
    };

    const isLastProductComplete = (products: Product[]) => {
        if (products.length === 0) return true;
        const lastProduct = products[products.length - 1];
        return !!lastProduct.product_name;
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
                    Quotation
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
                            "&:hover": { backgroundColor: "#004D40" },
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
                    const { totalAmount, taxableAmount, discountAmount, netAmount } = calculateTotals(
                        values.products,
                        values.discountPercent
                    );
                    const payload = {
                        enquiry_id: enquiryId,
                        clientId,
                        products: values.products,
                        total_amount: totalAmount,
                        taxable_amount: taxableAmount,
                        discount: values.discountPercent,
                        discount_amount: discountAmount,
                        net_amount: netAmount,
                    };
                    mutate(payload, {
                        onSuccess: () => {
                            queryClient.invalidateQueries({ queryKey: ["quotations-by-enquiry-id"] });
                            queryClient.invalidateQueries({ queryKey: ['enquiry-by-id', enquiryId] });
                            queryClient.invalidateQueries({ queryKey: ['enquiries'] });
                        }
                    });
                    setFlag(false);
                }}
            >
                {({ values, errors, touched, setFieldValue }) => {
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
                                                        {["Sr. No.", "Product Name", "Unit", "Price", "Action"].map((header) => (
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
                                                    {values.products.map((product, index) => {
                                                        const selectedProduct = allProducts.find(
                                                            (p) => p._id === product._id
                                                        );
                                                        const isPredefined = !!selectedProduct;
                                                        const currentSearch = searchStates[index] || "";

                                                        const filteredProducts = allProducts.filter((p) =>
                                                            p.product_name.toLowerCase().includes(currentSearch.toLowerCase())
                                                        );

                                                        return (
                                                            <TableRow key={index}>
                                                                <TableCell sx={{ padding: "8px" }}>
                                                                    <Field
                                                                        as={TextField}
                                                                        name={`products[${index}]._id`}
                                                                        size="small"
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        disabled={isPredefined}
                                                                        sx={{
                                                                            "& .MuiInputBase-root": {
                                                                                fontSize: "14px",
                                                                                borderRadius: "8px",
                                                                                width: "100px",
                                                                            },
                                                                        }}
                                                                        error={
                                                                            touched.products?.[index]?._id && !!errors.products?.[index]?._id
                                                                        }
                                                                        helperText={
                                                                            touched.products?.[index]?._id && errors.products?.[index]?._id ? (
                                                                                <Typography sx={{ color: "red", fontSize: "12px" }}>
                                                                                    {errors.products[index]._id}
                                                                                </Typography>
                                                                            ) : null
                                                                        }
                                                                    />
                                                                </TableCell>
                                                                <TableCell sx={{ padding: "8px" }}>
                                                                    <Field name={`products[${index}].product_name`}>
                                                                        {({ field }: any) => (
                                                                            <Autocomplete
                                                                                options={filteredProducts.map((p) => ({
                                                                                    label: p.product_name,
                                                                                    _id: p._id,
                                                                                }))}
                                                                                getOptionLabel={(option) => option.label}
                                                                                value={
                                                                                    allProducts.find((p) => p._id === product._id)
                                                                                        ? { label: product.product_name, _id: product._id }
                                                                                        : null
                                                                                }
                                                                                onChange={(event, newValue) => {
                                                                                    const selected = allProducts.find((p) => p._id === newValue?._id);
                                                                                    if (selected) {
                                                                                        setFieldValue(`products[${index}]._id`, selected._id);
                                                                                        setFieldValue(`products[${index}].product_name`, selected.product_name);
                                                                                        setFieldValue(`products[${index}].unit`, selected.unit);
                                                                                        setFieldValue(`products[${index}].product_price`, selected.product_price);
                                                                                        updateSearchState(index, "");
                                                                                    } else {
                                                                                        setFieldValue(`products[${index}]._id`, "");
                                                                                        setFieldValue(`products[${index}].product_name`, "");
                                                                                        setFieldValue(`products[${index}].unit`, "");
                                                                                        setFieldValue(`products[${index}].product_price`, "");
                                                                                    }
                                                                                }}
                                                                                onInputChange={(event, newInputValue) => {
                                                                                    if (!isPredefined) {
                                                                                        debouncedSetSearch(index, newInputValue);
                                                                                    }
                                                                                }}
                                                                                loading={isLoading}
                                                                                noOptionsText={filteredProducts.length === 0 && currentSearch ? "No products found" : "Type to search"}
                                                                                disablePortal
                                                                                open={currentSearch.length > 0 && !isPredefined}
                                                                                ListboxProps={{
                                                                                    sx: {
                                                                                        maxHeight: "150px",
                                                                                        overflowY: "auto",
                                                                                        "& .MuiAutocomplete-option": {
                                                                                            fontSize: "12px",
                                                                                        },
                                                                                    },
                                                                                }}
                                                                                sx={{
                                                                                    "& .MuiAutocomplete-popper": {
                                                                                        width: isPredefined ? "220px !important" : "170px !important",
                                                                                    },
                                                                                }}
                                                                                renderInput={(params) => (
                                                                                    <TextField
                                                                                        {...params}
                                                                                        size="small"
                                                                                        variant="outlined"
                                                                                        fullWidth
                                                                                        disabled={isPredefined}
                                                                                        sx={{
                                                                                            "& .MuiInputBase-root": {
                                                                                                fontSize: "14px",
                                                                                                borderRadius: "8px",
                                                                                                width: isPredefined ? "200px" : "150px",
                                                                                                transition: "width 0.3s ease",
                                                                                            },
                                                                                        }}
                                                                                        error={
                                                                                            touched.products?.[index]?.product_name &&
                                                                                            !!errors.products?.[index]?.product_name
                                                                                        }
                                                                                        helperText={
                                                                                            touched.products?.[index]?.product_name &&
                                                                                                errors.products?.[index]?.product_name ? (
                                                                                                <Typography sx={{ color: "red", fontSize: "12px" }}>
                                                                                                    {errors.products[index].product_name}
                                                                                                </Typography>
                                                                                            ) : null
                                                                                        }
                                                                                        InputProps={{
                                                                                            ...params.InputProps,
                                                                                            endAdornment: (
                                                                                                <>
                                                                                                    {isLoading && !isPredefined ? <span>Loading...</span> : null}
                                                                                                    {params.InputProps.endAdornment}
                                                                                                </>
                                                                                            ),
                                                                                        }}
                                                                                    />
                                                                                )}
                                                                            />
                                                                        )}
                                                                    </Field>
                                                                </TableCell>
                                                                <TableCell sx={{ padding: "8px" }}>
                                                                    <Field
                                                                        as={TextField}
                                                                        name={`products[${index}].unit`}
                                                                        size="small"
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        disabled={isPredefined}
                                                                        sx={{
                                                                            "& .MuiInputBase-root": {
                                                                                fontSize: "14px",
                                                                                borderRadius: "8px",
                                                                                width: "100px",
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
                                                                        name={`products[${index}].product_price`}
                                                                        type="number"
                                                                        size="small"
                                                                        variant="outlined"
                                                                        fullWidth
                                                                        disabled={isPredefined}
                                                                        sx={{
                                                                            "& .MuiInputBase-root": {
                                                                                fontSize: "14px",
                                                                                borderRadius: "8px",
                                                                                width: "100px",
                                                                            },
                                                                        }}
                                                                        error={
                                                                            touched.products?.[index]?.product_price &&
                                                                            !!errors.products?.[index]?.product_price
                                                                        }
                                                                        helperText={
                                                                            touched.products?.[index]?.product_price &&
                                                                                errors.products?.[index]?.product_price ? (
                                                                                <Typography sx={{ color: "red", fontSize: "12px" }}>
                                                                                    {errors.products[index].product_price}
                                                                                </Typography>
                                                                            ) : null
                                                                        }
                                                                    />
                                                                </TableCell>
                                                                <TableCell sx={{ padding: "8px" }}>
                                                                    <IconButton
                                                                        onClick={() => {
                                                                            remove(index);
                                                                            setSearchStates((prev) => prev.filter((_, i) => i !== index));
                                                                        }}
                                                                        sx={{
                                                                            backgroundColor: "#FF0000",
                                                                            color: "#FFFFFF",
                                                                            "&:hover": { backgroundColor: "#CC0000" },
                                                                        }}
                                                                    >
                                                                        <DeleteIcon />
                                                                    </IconButton>
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}
                                                    <TableRow>
                                                        <TableCell colSpan={5} sx={{ textAlign: "right", padding: "8px", paddingRight: "22px" }}>
                                                            <IconButton
                                                                onClick={() => {
                                                                    push({
                                                                        _id: "",
                                                                        product_name: "",
                                                                        unit: "",
                                                                        product_price: "",
                                                                    });
                                                                    setSearchStates((prev) => [...prev, ""]);
                                                                }}
                                                                disabled={!isLastProductComplete(values.products)}
                                                                sx={{
                                                                    backgroundColor: isLastProductComplete(values.products) ? "#2196F3" : "#B0BEC5",
                                                                    color: "#FFFFFF",
                                                                    "&:hover": { backgroundColor: isLastProductComplete(values.products) ? "#1976D2" : "#B0BEC5" },
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
                                                    "&:hover": { backgroundColor: "#004D40" },
                                                }}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                onClick={() => setFlag(false)}
                                                variant="contained"
                                                sx={{
                                                    backgroundColor: "#E0E0E0",
                                                    color: "#424242",
                                                    borderRadius: "8px",
                                                    padding: "8px 24px",
                                                    textTransform: "capitalize",
                                                    fontSize: "14px",
                                                    fontWeight: "bold",
                                                    "&:hover": { backgroundColor: "#B0BEC5" },
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

export default CreateQuotationForm;