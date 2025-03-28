import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import {
    Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, IconButton, Menu, MenuItem, Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useEffect, useState } from "react";
import { Colors } from "../../../../constants/Colors";
import { useGetOrderByEnquiryId } from "../../../../hooks/enquiry/useGetOrderByEnquiry";
import { useGetAllUsers } from "../../../../hooks/enquiry/useGetAllUsers";
import { useAddChallan } from "../../../../hooks/enquiry/useAddChallan";
import { useGetProductByBarCode } from "../../../../hooks/enquiry/useGetProductByBarCode";

interface Product {
    _id: string;
    product_barcode: string;
    product_name: string;
    quantity: string;
    unit: string;
}

interface FormValues {
    products: Product[];
    order_id: string;
    enquiry_id: string;
}

interface CreateChallanFormProps {
    setFlag: (isCreating: boolean) => void;
    enquiryDetails: any;
}

const validationSchema = Yup.object({
    products: Yup.array()
        .of(
            Yup.object({
                _id: Yup.string().required("Product Id is required"),
                product_barcode: Yup.string().required("Bar Code is required"),
                product_name: Yup.string().required("Product is required"),
                quantity: Yup.number()
                    .required("Quantity is required")
                    .min(1, "Quantity must be at least 1"),
                unit: Yup.string().required("Unit is required"),
            })
        )
        .min(1, "At least one product is required"),
});

const CreateChallanForm: React.FC<CreateChallanFormProps> = ({ setFlag, enquiryDetails }) => {
    const [barcode, setBarcode] = useState("");
    const [currentProductIndex, setCurrentProductIndex] = useState<number | null>(null);

    const { data } = useGetOrderByEnquiryId(enquiryDetails?._id);
    const { data: userList } = useGetAllUsers();
    const { data: productData, isFetching } = useGetProductByBarCode(barcode);
    const { mutate } = useAddChallan();

    const initialValues: FormValues = {
        products: [],
        enquiry_id: enquiryDetails?._id,
        order_id: data?.data?._id,
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedAssignTo, setSelectedAssignTo] = useState<string[]>([]);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (productData && currentProductIndex !== null) {
            const product = productData.data;
            if (product) {
                console.log(`Filling product details for index ${currentProductIndex}:`, product);
            }
        }
    }, [productData, currentProductIndex]);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (userId: string) => {
        setSelectedAssignTo((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId]
        );
    };

    const handleSubmit = (values: FormValues) => {
        const productList = values?.products?.map((product) => product?._id);
        const challanData = {
            enquiry_id: values?.enquiry_id,
            order_id: values?.order_id,
            products: productList,
            assign_to: selectedAssignTo,
        };
        mutate(challanData, {
            onSuccess: () => {
                setFlag(false);
            },
        });
    }

    const selectedUserNames = userList
        ?.filter((user: any) => selectedAssignTo.includes(user._id))
        ?.map((user: any) => user.user_name) || [];

    // Handle barcode input change
    const handleBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        setCurrentProductIndex(index);
        setBarcode(value);
    };

    // Handle adding a new product
    const handleAddProduct = (push: (obj: any) => void) => {
        push({
            product_barcode: "",
            _id: "",
            product_name: "",
            quantity: "",
            unit: "",
        });
        setBarcode("");
        setCurrentProductIndex(null);
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
                    Challan
                </Typography>
                <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                        variant="contained"
                        endIcon={<ArrowDropDownIcon />}
                        onClick={handleClick}
                        sx={{
                            width: "200px",
                            backgroundColor: "white",
                            color: "#004D40",
                            borderRadius: "8px",
                            padding: "8px 16px",
                            textTransform: "capitalize",
                            fontSize: "14px",
                            fontWeight: "bold",
                            height: "3.3rem",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            "& .MuiButton-endIcon": {
                                marginLeft: 0,
                            },
                        }}
                    >
                        {selectedAssignTo.length > 0
                            ? selectedUserNames.join(", ")
                            : "Assign Challan To"}
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        PaperProps={{
                            style: {
                                maxHeight: "200px",
                                width: "250px",
                            },
                        }}
                    >
                        {userList && Array.isArray(userList) ? (
                            userList.map((user: any) => (
                                <MenuItem
                                    key={user._id}
                                    sx={{
                                        width: "250px",
                                        fontSize: "14px",
                                        padding: "8px 16px",
                                    }}
                                >
                                    <Checkbox
                                        checked={selectedAssignTo.includes(user._id)}
                                        onChange={() => handleMenuItemClick(user._id)}
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                    <span>{user.user_name}</span>
                                    <span style={{ fontSize: "12px", marginLeft: "4px" }}>
                                        ({user.user_role})
                                    </span>
                                </MenuItem>
                            ))
                        ) : (
                            <MenuItem
                                disabled
                                sx={{
                                    width: "250px",
                                    fontSize: "14px",
                                    padding: "8px 16px",
                                }}
                            >
                                No users available
                            </MenuItem>
                        )}
                    </Menu>
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
                    console.log(values);
                }}
            >
                {({ values, errors, touched, setFieldValue }) => (
                    <Form>
                        <FieldArray name="products">
                            {({ push, remove }) => (
                                <>
                                    <TableContainer sx={{ bgcolor: "#FFFFFF", borderRadius: 2, mb: 3 }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow sx={{ bgcolor: Colors.primary }}>
                                                    {["BarCode", "Product Id", "Product Name", "Qty.", "Unit", "Action"].map((header) => (
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
                                                                name={`products[${index}].product_barcode`}
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
                                                                    touched.products?.[index]?.product_barcode && !!errors.products?.[index]?.product_barcode
                                                                }
                                                                helperText={
                                                                    touched.products?.[index]?.product_barcode && errors.products?.[index]?.product_barcode ? (
                                                                        <Typography sx={{ color: "red", fontSize: "12px" }}>
                                                                            {errors.products[index].product_barcode}
                                                                        </Typography>
                                                                    ) : null
                                                                }
                                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                    handleBarcodeChange(e, index);
                                                                    setFieldValue(`products[${index}].product_barcode`, e.target.value);
                                                                }}
                                                            />
                                                        </TableCell>
                                                        <TableCell sx={{ padding: "8px" }}>
                                                            <Field
                                                                as={TextField}
                                                                name={`products[${index}]._id`}
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
                                                                    touched.products?.[index]?._id && !!errors.products?.[index]?._id
                                                                }
                                                                helperText={
                                                                    touched.products?.[index]?._id && errors.products?.[index]?._id ? (
                                                                        <Typography sx={{ color: "red", fontSize: "12px" }}>
                                                                            {errors.products[index]._id}
                                                                        </Typography>
                                                                    ) : null
                                                                }
                                                                value={product._id}
                                                            />
                                                        </TableCell>
                                                        <TableCell sx={{ padding: "8px" }}>
                                                            <Field
                                                                as={TextField}
                                                                name={`products[${index}].product_name`}
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
                                                                value={product.product_name}
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
                                                                value={product.quantity}
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
                                                                value={product.unit}
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
                                                    <TableCell colSpan={7} sx={{ textAlign: "right", padding: "8px", paddingRight: "22px" }}>
                                                        <IconButton
                                                            onClick={() => handleAddProduct(push)}
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
                                    {/* ... (rest of the JSX remains the same) ... */}
                                </>
                            )}
                        </FieldArray>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default CreateChallanForm;