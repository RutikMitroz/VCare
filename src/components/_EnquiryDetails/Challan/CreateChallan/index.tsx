import { Formik, Form, Field, FieldArray } from "formik";
import * as Yup from "yup";
import {
    Box, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, IconButton, Menu, MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";

interface Challan {
    srNo: string;
    scanId: string;
    products: string;
    quantity: string;
    unit: string;
}

interface FormValues {
    products: Challan[];
    assignTo: string;
}

interface CreateChallanFormProps {
    setFlag: (isCreating: boolean) => void;
}

const validationSchema = Yup.object({
    products: Yup.array()
        .of(
            Yup.object({
                srNo: Yup.string().required("Sr. No. is required"),
                scanId: Yup.string().required("Scan ID is required"),
                products: Yup.string().required("Product is required"),
                quantity: Yup.number()
                    .required("Quantity is required")
                    .min(1, "Quantity must be at least 1"),
                unit: Yup.string().required("Unit is required"),
            })
        )
        .min(1, "At least one product is required"),
    assignTo: Yup.string().required("Please select an option to assign the challan"),
});

const CreateChallanForm: React.FC<CreateChallanFormProps> = ({ setFlag }) => {
    const initialValues: FormValues = {
        products: [
            {
                srNo: "#0001",
                scanId: "25n2025",
                products: "Hikvision 5MP CCTV Camera",
                quantity: "6",
                unit: "NOS",
            },
        ],
        assignTo: "",
    };

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedAssignTo, setSelectedAssignTo] = useState<string>("");
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const assignOptions = [
        { value: "teamA", label: "Team A" },
        { value: "teamB", label: "Team B" },
        { value: "teamC", label: "Team C" },
    ];

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
                        {selectedAssignTo
                            ? assignOptions.find((option) => option.value === selectedAssignTo)?.label
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
                    >
                        {assignOptions.map((option) => (
                            <MenuItem
                                key={option.value}
                                onClick={() => {
                                    setSelectedAssignTo(option.value); 
                                    handleClose();
                                }}
                            >
                                {option.label}
                            </MenuItem>
                        ))}
                    </Menu>
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: "#1D434C",
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
                    const updatedValues = { ...values, assignTo: selectedAssignTo };
                    console.log("Form Values:", updatedValues);
                    setFlag(true);
                }}
            >
                {({ values, errors, touched }) => (
                    <Form>
                        <FieldArray name="products">
                            {({ push, remove }) => (
                                <>
                                    <TableContainer sx={{ bgcolor: "#FFFFFF", borderRadius: 2, mb: 3 }}>
                                        <Table>
                                            <TableHead>
                                                <TableRow sx={{ bgcolor: "#1D434C" }}>
                                                    {["Sr. No.", "Scan Id", "Products", "Qty.", "Unit", "Action"].map((header) => (
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
                                                                name={`products[${index}].scanId`}
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
                                                                    touched.products?.[index]?.scanId && !!errors.products?.[index]?.scanId
                                                                }
                                                                helperText={
                                                                    touched.products?.[index]?.scanId && errors.products?.[index]?.scanId ? (
                                                                        <Typography sx={{ color: "red", fontSize: "12px" }}>
                                                                            {errors.products[index].scanId}
                                                                        </Typography>
                                                                    ) : null
                                                                }
                                                            />
                                                        </TableCell>
                                                        <TableCell sx={{ padding: "8px" }}>
                                                            <Field
                                                                as={TextField}
                                                                name={`products[${index}].products`}
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
                                                                    touched.products?.[index]?.products &&
                                                                    !!errors.products?.[index]?.products
                                                                }
                                                                helperText={
                                                                    touched.products?.[index]?.products &&
                                                                        errors.products?.[index]?.products ? (
                                                                        <Typography sx={{ color: "red", fontSize: "12px" }}>
                                                                            {errors.products[index].products}
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
                                                            onClick={() =>
                                                                push({
                                                                    srNo: `#${(values.products.length + 1).toString().padStart(4, "0")}`,
                                                                    scanId: "",
                                                                    products: "",
                                                                    quantity: "",
                                                                    unit: "",
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
                                    <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                backgroundColor: "#1D434C",
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
                )}
            </Formik>
        </Box>
    );
};

export default CreateChallanForm;