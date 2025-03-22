import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
    Modal, Box, Typography, TextField, Select, MenuItem,
    FormControl, InputLabel, Grid, Button,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useGetClients } from "../../../../hooks/enquiry/useGetAllClients";
import { Colors } from "../../../../constants/Colors";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import { useAddEnquiry } from "../../../../hooks/enquiry/useAddEnquiry";
import { useGetSalesman } from "../../../../hooks/enquiry/useGetAllSalesman";
import convertDateToString from "../../../../utils/convertDateToString";
import { useQueryClient } from "@tanstack/react-query";

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
    mailId: Yup.string().email("Invalid email format").required("Mail ID is required"),
    address: Yup.string().required("Address is required"),
    assignEnquiry: Yup.string().required("Assign Enquiry is required"),
    enquiryFor: Yup.string().required("Enquiry For is required"),
    enquiryDate: Yup.date().required("Enquiry Date is required").nullable(),
});

const AddEnquiryModal = ({ open, onClose }: AddEnquiryModalProps) => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const { data } = useGetClients();
    const { data: salesmans } = useGetSalesman();
    const { mutate } = useAddEnquiry();

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

    const handleSubmit = (values: Enquiry, { resetForm }: FormikHelpers<Enquiry>) => {
        mutate({
            client_id: values.clientName,
            assign_to: values.assignEnquiry,
            date: convertDateToString(values.enquiryDate || new Date()),
            enquiry_for: values.enquiryFor,
            enquiry_description: values.enquiryDescription,
        }, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["enquiries"] });
                resetForm();
                onClose();
            }
        }
        )
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 900,
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
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={new Date()}
                            disabled
                            renderInput={(params: any) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        width: "10px",
                                        "& .MuiInputBase-input": {
                                            padding: "6px 8px",
                                            fontSize: "0.875rem",
                                        },
                                    }}
                                    inputProps={{ ...params.inputProps, readOnly: true }}
                                />
                            )}
                            format="dd/MM/yyyy"
                        />
                    </LocalizationProvider>
                </Box>
                <Box sx={{ borderBottom: "1px solid #E0E0E0", mb: 3 }} />

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, setFieldValue, values }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <FormControl fullWidth size="small">
                                        <InputLabel>Client Name</InputLabel>
                                        <Field
                                            as={Select}
                                            name="clientName"
                                            label="Client Name"
                                            value={values.clientName}
                                            onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                                                const selectedClientName = e.target.value as string;
                                                setFieldValue("clientName", selectedClientName);
                                                const selectedClient = data?.data?.find(
                                                    (client: any) => client._id === selectedClientName
                                                );

                                                if (selectedClient) {
                                                    setFieldValue("companyName", selectedClient.client_company || "");
                                                    setFieldValue("contactNumber", selectedClient.client_phone || "");
                                                    setFieldValue("mailId", selectedClient.client_email || "");
                                                    setFieldValue("mapLink", selectedClient.mapLink || "");
                                                    setFieldValue("address", selectedClient.client_address || "");
                                                }
                                            }}
                                            error={touched.clientName && !!errors.clientName}
                                        >
                                            <MenuItem value="">Select Client</MenuItem>
                                            {data?.data?.map((client: any) => (
                                                <MenuItem key={client.client_name} value={client._id}>
                                                    {client.client_name}
                                                </MenuItem>
                                            ))}
                                            <MenuItem
                                                onClick={() => {
                                                    navigate("/masters/client");
                                                }}
                                                sx={{
                                                    justifyContent: "center",
                                                    backgroundColor: "#E3F2FD",
                                                    color: "#1976D2",
                                                    "&:hover": {
                                                        backgroundColor: "#BBDEFB",
                                                    },
                                                }}
                                            >
                                                <AddIcon sx={{ fontSize: '16px' }} />  Add New Client
                                            </MenuItem>
                                        </Field>
                                        <Typography sx={{ color: "red", fontSize: "12px", mt: 1 }}>
                                            <ErrorMessage name="clientName" />
                                        </Typography>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <Field
                                        as={TextField}
                                        disabled
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
                                        disabled
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
                                        disabled
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
                                        disabled
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
                                        disabled
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
                                            <MenuItem value="">Select Salesman</MenuItem>
                                            {salesmans?.data?.map((salesman: any) => (
                                                <MenuItem key={salesman._id} value={salesman._id}>
                                                    {salesman.user_name}
                                                </MenuItem>
                                            ))}
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
                            <Box sx={{ display: "flex", justifyContent: "center", mt: 3, gap: 4 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        backgroundColor: Colors.primary,
                                        paddingX: 12,
                                        fontWeight: "bold",
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
                                        backgroundColor: "#D2D2D2",
                                        paddingX: 12,
                                        fontWeight: "bold",
                                        color: "black",
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