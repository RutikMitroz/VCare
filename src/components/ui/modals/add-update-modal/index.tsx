import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Modal, Box, Typography, TextField, Grid, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Colors } from "../../../../constants/Colors";

interface addUpdate {
    writeNote: string;
    nextFollowDate: Date | null;
    comment: string;
}

interface AddUpdateModalProps {
    open: boolean;
    onClose: () => void;
}

const validationSchema = Yup.object({
    writeNote: Yup.string().required("Note is required"),
    nextFollowDate: Yup.date().required("Next follow up Date is required").nullable(),
    comment: Yup.string().required("Comment is required"),
});

const AddUpdateModal = ({ open, onClose }: AddUpdateModalProps) => {
    const initialValues: addUpdate = {
        writeNote: "",
        nextFollowDate: null, 
        comment: "",
    };

    const handleSubmit = (values: addUpdate) => {
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
                    width: 700,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    borderRadius: "12px",
                    p: 4,
                }}
            >
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#424242" }}>
                        Add Update
                    </Typography>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={new Date()} 
                            disabled 
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                        width: "100px",
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
                    {({ values, setFieldValue, errors, touched }) => (
                        <Form>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        name="writeNote"
                                        size="small"
                                        variant="outlined"
                                        placeholder="Write note ..."
                                        multiline
                                        rows={3}
                                        error={!!errors.writeNote && touched.writeNote}
                                        helperText={<ErrorMessage name="writeNote" />}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Next Follow Up"
                                            value={values.nextFollowDate}
                                            onChange={(date) => setFieldValue("nextFollowDate", date)} 
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    size="small"
                                                    variant="outlined"
                                                    error={!!errors.nextFollowDate && touched.nextFollowDate}
                                                    helperText={<ErrorMessage name="nextFollowDate" />}
                                                />
                                            )}
                                            format="dd/MM/yyyy"
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <Field
                                        as={TextField}
                                        fullWidth
                                        name="comment"
                                        size="small"
                                        variant="outlined"
                                        placeholder="Comment ..."
                                        multiline
                                        rows={2}
                                        error={!!errors.comment && touched.comment}
                                        helperText={<ErrorMessage name="comment" />}
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
                                    Add
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

export default AddUpdateModal;