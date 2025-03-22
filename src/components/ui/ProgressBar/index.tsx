import {
    Stepper, Step, StepLabel, StepConnector, stepConnectorClasses,
    Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

const CustomConnector = styled(StepConnector)(() => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: "calc(-50% + 20px)",
        right: "calc(50% + 20px)",
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#4CAF50",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#4CAF50",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: "#B0BEC5",
        borderTopWidth: 2,
        borderRadius: 1,
    },
}));

const CustomStepIcon = (props: { active: boolean; completed: boolean }) => {
    const { active, completed } = props;

    return (
        <Box
            sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                backgroundColor: completed
                    ? "#4CAF50"
                    : active
                        ? "#FF9800"
                        : "#B0BEC5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: "12px",
                fontWeight: "bold",
            }}
        >
            {completed ? "✔" : active ? "●" : "○"}
        </Box>
    );
};

const ProgressBar = () => {
    const steps = ["Quotations", "Order", "Challan", "Invoice"];
    const activeStep = useAppSelector((state) => state.progressBar.activeStep);
    const completedSteps = useAppSelector((state) => state.progressBar.completedSteps);
    const dispatch = useAppDispatch();

    return (
        <Box sx={{ width: "100%", backgroundColor: "white", borderRadius: "16px", border: "1px solid black" }}>
            <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<CustomConnector />}
                sx={{
                    padding: "8px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            >
                {steps.map((label, index) => (
                    <Step key={label} completed={completedSteps.includes(index)}>
                        <StepLabel
                            StepIconComponent={CustomStepIcon}
                            sx={{
                                "& .MuiStepLabel-label": {
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    color: completedSteps.includes(index)
                                        ? "#4CAF50"
                                        : index === activeStep
                                            ? "#FF9800"
                                            : "#B0BEC5",
                                    marginTop: "8px",
                                },
                            }}
                        >
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
            {/* Removed Back and Next buttons since progress will be controlled by actions */}
        </Box>
    );
};

export default ProgressBar;