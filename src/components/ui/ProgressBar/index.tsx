// import {
//     Stepper, Step, StepLabel, StepConnector, stepConnectorClasses,
//     Box,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";

// const CustomConnector = styled(StepConnector)(() => ({
//     [`&.${stepConnectorClasses.alternativeLabel}`]: {
//         top: 10,
//         left: "calc(-50% + 20px)",
//         right: "calc(50% + 20px)",
//     },
//     [`&.${stepConnectorClasses.active}`]: {
//         [`& .${stepConnectorClasses.line}`]: {
//             borderColor: "#4CAF50",
//         },
//     },
//     [`&.${stepConnectorClasses.completed}`]: {
//         [`& .${stepConnectorClasses.line}`]: {
//             borderColor: "#4CAF50",
//         },
//     },
//     [`& .${stepConnectorClasses.line}`]: {
//         borderColor: "#B0BEC5",
//         borderTopWidth: 2,
//         borderRadius: 1,
//     },
// }));

// const CustomStepIcon = (props: { active: boolean; completed: boolean }) => {
//     const { active, completed } = props;

//     return (
//         <Box
//             sx={{
//                 width: 24,
//                 height: 24,
//                 borderRadius: "50%",
//                 backgroundColor: completed
//                     ? "#4CAF50"
//                     : active
//                         ? "#FF9800"
//                         : "#B0BEC5",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 color: "#FFFFFF",
//                 fontSize: "12px",
//                 fontWeight: "bold",
//             }}
//         >
//             {completed ? "✔" : active ? "●" : "○"}
//         </Box>
//     );
// };

// interface ProgressBarProps {
//     enquiryDetails: any;
// }

// const ProgressBar = ({ enquiryDetails }: ProgressBarProps) => {
//     const steps = ["Quotations", "Order", "Challan", "Invoice"];

//     const getProgress = () => {
//         const hasQuotations = enquiryDetails?.status === "quotation_created";
//         const hasOrders = enquiryDetails?.status === "order_created";
//         const hasChallans = enquiryDetails?.status === "challan_created";
//         const hasInvoices = enquiryDetails?.status === "invoice_created";

//         if (hasInvoices) {
//             return { activeStep: 3, completedSteps: [0, 1, 2, 3] };
//         } else if (hasChallans) {
//             return { activeStep: 3, completedSteps: [0, 1, 2] };
//         } else if (hasOrders) {
//             return { activeStep: 2, completedSteps: [0, 1] };
//         } else if (hasQuotations) {
//             return { activeStep: 1, completedSteps: [0] };
//         } else {
//             return { activeStep: 0, completedSteps: [] };
//         }
//     };

//     const { activeStep, completedSteps } = getProgress();

//     return (
//         <Box sx={{ width: "100%", backgroundColor: "white", borderRadius: "16px", border: "1px solid black" }}>
//             <Stepper
//                 alternativeLabel
//                 activeStep={activeStep}
//                 connector={<CustomConnector />}
//                 sx={{
//                     padding: "8px",
//                     borderRadius: "12px",
//                     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//                 }}
//             >
//                 {steps.map((label, index) => (
//                     <Step key={label} completed={completedSteps.includes(index)}>
//                         <StepLabel
//                             StepIconComponent={CustomStepIcon}
//                             sx={{
//                                 "& .MuiStepLabel-label": {
//                                     fontSize: "14px",
//                                     fontWeight: "bold",
//                                     color: completedSteps.includes(index)
//                                         ? "#4CAF50"
//                                         : index === activeStep
//                                             ? "#FF9800"
//                                             : "#B0BEC5",
//                                     marginTop: "8px",
//                                 },
//                             }}
//                         >
//                             {label}
//                         </StepLabel>
//                     </Step>
//                 ))}
//             </Stepper>
//         </Box>
//     );
// };

// export default ProgressBar;

import {
    Stepper, Step, StepLabel, StepConnector, stepConnectorClasses,
    Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";

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

const CustomStepIcon = (props: { active: boolean; completed: boolean; displayed: boolean }) => {
    const { active, completed, displayed } = props;

    return (
        <Box
            sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                backgroundColor: completed
                    ? "#4CAF50"
                    : active || displayed
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
            {completed ? "✔" : active || displayed ? "●" : "○"}
        </Box>
    );
};

interface ProgressBarProps {
    enquiryDetails: any;
    displayedStep: number;
    onStepClick: (step: number) => void;
}

const ProgressBar = ({ enquiryDetails, displayedStep, onStepClick }: ProgressBarProps) => {
    const steps = ["Quotations", "Order", "Challan", "Invoice"];

    const getProgress = () => {
        const hasQuotations = enquiryDetails?.status === "quotation_created";
        const hasOrders = enquiryDetails?.status === "order_created";
        const hasChallans = enquiryDetails?.status === "challan_created";
        const hasInvoices = enquiryDetails?.status === "invoice_created";

        if (hasInvoices) {
            return { activeStep: 3, completedSteps: [0, 1, 2, 3] };
        } else if (hasChallans) {
            return { activeStep: 3, completedSteps: [0, 1, 2] };
        } else if (hasOrders) {
            return { activeStep: 2, completedSteps: [0, 1] };
        } else if (hasQuotations) {
            return { activeStep: 1, completedSteps: [0] };
        } else {
            return { activeStep: 0, completedSteps: [] };
        }
    };

    const { activeStep, completedSteps } = getProgress();

    const handleStepClick = (index: number) => {
        // Allow clicking only on completed steps or the active step
        if (completedSteps.includes(index) || index === activeStep) {
            onStepClick(index);
        }
    };

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
                    <Step
                        key={label}
                        completed={completedSteps.includes(index)}
                        onClick={() => handleStepClick(index)}
                        sx={{ cursor: completedSteps.includes(index) || index === activeStep ? "pointer" : "default" }}
                    >
                        <StepLabel
                            StepIconComponent={(props) => (
                                <CustomStepIcon
                                    {...props}
                                    displayed={index === displayedStep}
                                />
                            )}
                            sx={{
                                "& .MuiStepLabel-label": {
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                    color: completedSteps.includes(index)
                                        ? "#4CAF50"
                                        : index === activeStep || index === displayedStep
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
        </Box>
    );
};

export default ProgressBar;