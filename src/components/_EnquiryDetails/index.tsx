// import { Box } from "@mui/material";
// import ClientDetailsCard from "../ui/Cards/ClientDetailsCard";
// import EnquiryDetailsCard from "../ui/Cards/EnquiryDetailsCard";
// import ActivityCard from "../ui/Cards/ActivityCard";
// import ProgressBar from "../ui/ProgressBar";
// import Quotation from "./Quotatiion";
// import Order from "./Order";
// import Challan from "./Challan";
// import Invoice from "./Invoice";
// import { useGetEnquiryById } from "../../hooks/enquiry/useGetEnquiryById";
// import { useParams } from "react-router-dom";

// const RenderEnquiryDetails = () => {
//     const { enquiryId } = useParams<{ enquiryId: string }>();
//     const { data } = useGetEnquiryById(enquiryId || "");

//     const renderComponent = () => {
//         const enquiryDetails = data?.data;

//         const hasQuotations = enquiryDetails?.status === "quotation_created";
//         const hasOrders = enquiryDetails?.status === "order_created";
//         const hasChallans = enquiryDetails?.status === "challan_created";

//         if (hasChallans) {
//             return <Invoice enquiryDetails={enquiryDetails} />;
//         } else if (hasOrders) {
//             return <Challan enquiryDetails={enquiryDetails} />;
//         } else if (hasQuotations) {
//             return <Order enquiryDetails={enquiryDetails} />;
//         } else {
//             return <Quotation enquiryDetails={enquiryDetails} />;
//         }
//     };

//     return (
//         <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
//             <Box sx={{ width: "20%", display: "flex", flexDirection: "column", gap: 2 }}>
//                 <ClientDetailsCard clientDetails={data?.data?.client_id} />
//                 <EnquiryDetailsCard enquiryDetails={data?.data} />
//             </Box>
//             <Box sx={{ width: "60%", display: "flex", flexDirection: "column", gap: 2 }}>
//                 <ProgressBar enquiryDetails={data?.data} />
//                 {data?.data && renderComponent()}
//             </Box>
//             <Box sx={{ width: "20%" }}>
//                 <ActivityCard />
//             </Box>
//         </Box>
//     );
// };

// export default RenderEnquiryDetails;

import { useState } from "react";
import { Box } from "@mui/material";
import ClientDetailsCard from "../ui/Cards/ClientDetailsCard";
import EnquiryDetailsCard from "../ui/Cards/EnquiryDetailsCard";
import ActivityCard from "../ui/Cards/ActivityCard";
import ProgressBar from "../ui/ProgressBar";
import Quotation from "./Quotatiion";
import Order from "./Order";
import Challan from "./Challan";
import Invoice from "./Invoice";
import { useGetEnquiryById } from "../../hooks/enquiry/useGetEnquiryById";
import { useParams } from "react-router-dom";

const RenderEnquiryDetails = () => {
    const { enquiryId } = useParams<{ enquiryId: string }>();
    const { data } = useGetEnquiryById(enquiryId || "");
    const [displayedStep, setDisplayedStep] = useState<number | null>(null);

    const renderComponent = () => {
        const enquiryDetails = data?.data;

        // Default to the current step if no step has been clicked
        const stepToDisplay = displayedStep !== null ? displayedStep : getActiveStep();

        switch (stepToDisplay) {
            case 0:
                return <Quotation enquiryDetails={enquiryDetails} />;
            case 1:
                return <Order enquiryDetails={enquiryDetails} />;
            case 2:
                return <Challan enquiryDetails={enquiryDetails} />;
            case 3:
                return <Invoice enquiryDetails={enquiryDetails} />;
            default:
                return <Quotation enquiryDetails={enquiryDetails} />;
        }
    };

    const getActiveStep = () => {
        const enquiryDetails = data?.data;
        const hasQuotations = enquiryDetails?.status === "quotation_created";
        const hasOrders = enquiryDetails?.status === "order_created";
        const hasChallans = enquiryDetails?.status === "challan_created";
        const hasInvoices = enquiryDetails?.status === "invoice_created";

        if (hasInvoices) return 3;
        if (hasChallans) return 2;
        if (hasOrders) return 1;
        if (hasQuotations) return 0;
        return 0;
    };

    const handleStepClick = (step: number) => {
        setDisplayedStep(step);
    };

    return (
        <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
            <Box sx={{ width: "20%", display: "flex", flexDirection: "column", gap: 2 }}>
                <ClientDetailsCard clientDetails={data?.data?.client_id} />
                <EnquiryDetailsCard enquiryDetails={data?.data} />
            </Box>
            <Box sx={{ width: "60%", display: "flex", flexDirection: "column", gap: 2 }}>
                <ProgressBar
                    enquiryDetails={data?.data}
                    displayedStep={displayedStep !== null ? displayedStep : getActiveStep()}
                    onStepClick={handleStepClick}
                />
                {data?.data && renderComponent()}
            </Box>
            <Box sx={{ width: "20%" }}>
                <ActivityCard />
            </Box>
        </Box>
    );
};

export default RenderEnquiryDetails;