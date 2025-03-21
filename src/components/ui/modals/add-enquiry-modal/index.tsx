import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Modal, Box, Typography, TextField, Select, MenuItem, FormControl, InputLabel, Grid, Button, } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

interface Enquiry {
    clientName: string;
    companyName: string;
    contactNumber: string;
    mailId: string;
    mapLink: string;
    address: string;
    assignEnquiry: string;
    enquiryFor: string;
    enquiryDescription: string;
    enquiryDate: Date | null;
}

interface AddEnquiryModalProps {
    open: boolean;
    onClose: () => void;
}

const validationSchema = Yup.object({
    clientName: Yup.string().required("Client Name is required"),
    contactNumber: Yup.string()
        .matches(/^[0-9]{10}$/, "Contact Number must be 10 digits")
        .required("Contact Number is required"),
    mailId: Yup.string()
        .email("Invalid email format")
        .required("Mail ID is required"),
    address: Yup.string().required("Address is required"),
    assignEnquiry: Yup.string().required("Assign Enquiry is required"),
    enquiryFor: Yup.string().required("Enquiry For is required"),
    enquiryDate: Yup.date().required("Enquiry Date is required").nullable(),
});

const AddEnquiryModal = ({ open, onClose }: AddEnquiryModalProps) => {
    // Initial form values
    const initialValues: Enquiry = {
        clientName: "",
        companyName: "",
        contactNumber: "",
        mailId: "",
        mapLink: "",
        address: "",
        assignEnquiry: "",
        enquiryFor: "",
        enquiryDescription: "",
        enquiryDate: new Date(),
    };

    const handleSubmit = (values: Enquiry) => {
        // onSave(values);
        console.log(values);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 600,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    borderRadius: "12px",
                    p: 4,
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#424242" }}>
                        Add Enquiry
                    </Typography>
                </Box>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue, errors, touched }) => (
                        <Form>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker
                                        value={values.enquiryDate}
                                        onChange={(date) => setFieldValue("enquiryDate", date)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                size="small"
                                                sx={{ width: "150px" }}
                                                error={touched.enquiryDate && !!errors.enquiryDate}
                                                helperText={touched.enquiryDate && errors.enquiryDate}
                                            />
                                        )}
                                    />
                                </LocalizationProvider>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Client Name"
                                        name="clientName"
                                        size="small"
                                        variant="outlined"
                                        placeholder="Enter name"
                                        error={touched.clientName && !!errors.clientName}
                                        helperText={<ErrorMessage name="clientName" />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Company Name"
                                        name="companyName"
                                        size="small"
                                        variant="outlined"
                                        placeholder="Enter company name"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Contact Number"
                                        name="contactNumber"
                                        size="small"
                                        variant="outlined"
                                        placeholder="Enter number"
                                        error={touched.contactNumber && !!errors.contactNumber}
                                        helperText={<ErrorMessage name="contactNumber" />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Mail ID"
                                        name="mailId"
                                        size="small"
                                        variant="outlined"
                                        placeholder="Enter mail id"
                                        error={touched.mailId && !!errors.mailId}
                                        helperText={<ErrorMessage name="mailId" />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Map Link"
                                        name="mapLink"
                                        size="small"
                                        variant="outlined"
                                        placeholder="Enter map link"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Address"
                                        name="address"
                                        size="small"
                                        variant="outlined"
                                        placeholder="Enter Details"
                                        multiline
                                        rows={3}
                                        error={touched.address && !!errors.address}
                                        helperText={<ErrorMessage name="address" />}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Assign Enquiry</InputLabel>
                                        <Field
                                            as={Select}
                                            name="assignEnquiry"
                                            label="Assign Enquiry"
                                            error={touched.assignEnquiry && !!errors.assignEnquiry}
                                        >
                                            <MenuItem value="">Select</MenuItem>
                                            <MenuItem value="Team A">Team A</MenuItem>
                                            <MenuItem value="Team B">Team B</MenuItem>
                                            <MenuItem value="Team C">Team C</MenuItem>
                                        </Field>
                                        <Typography sx={{ color: "red", fontSize: "12px", mt: 1 }}>
                                            <ErrorMessage name="assignEnquiry" />
                                        </Typography>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Enquiry For</InputLabel>
                                        <Field
                                            as={Select}
                                            name="enquiryFor"
                                            label="Enquiry For"
                                            error={touched.enquiryFor && !!errors.enquiryFor}
                                        >
                                            <MenuItem value="">Select</MenuItem>
                                            <MenuItem value="CCTV">CCTV</MenuItem>
                                            <MenuItem value="Access Control">Access Control</MenuItem>
                                            <MenuItem value="Networking">Networking</MenuItem>
                                        </Field>
                                        <Typography sx={{ color: "red", fontSize: "12px", mt: 1 }}>
                                            <ErrorMessage name="enquiryFor" />
                                        </Typography>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        label="Enquiry Description"
                                        name="enquiryDescription"
                                        size="small"
                                        variant="outlined"
                                        placeholder="Enter Details"
                                        multiline
                                        rows={3}
                                    />
                                </Grid>
                            </Grid>
                            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3, gap: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: "#00695C",
                                        color: "#FFFFFF",
                                        textTransform: "none",
                                        "&:hover": {
                                            backgroundColor: "#004D40",
                                        },
                                    }}
                                >
                                    Save
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={onClose}
                                    sx={{
                                        backgroundColor: "#B0BEC5",
                                        color: "#FFFFFF",
                                        textTransform: "none",
                                        "&:hover": {
                                            backgroundColor: "#90A4AE",
                                        },
                                    }}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Modal>
    );
};

export default AddEnquiryModal;