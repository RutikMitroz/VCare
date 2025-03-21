import { Box } from "@mui/material";
import ClientDetailsCard from "../ui/Cards/ClientDetailsCard";
import EnquiryDetailsCard from "../ui/Cards/EnquiryDetailsCard";
import ActivityCard from "../ui/Cards/ActivityCard";
import ProgressBar from "../ui/ProgressBar";
import Quotation from "./Quotatiion";
import Order from "./Order";
import { useAppSelector } from "../../redux/store";
import Challan from "./Challan";
import Invoice from "./Invoice";

const RenderEnquiryDetails = () => {
    const activeStep = useAppSelector((state) => state.progressBar.activeStep);

    const stepComponents = [
        <Quotation key="quotation" />,
        <Order key="order" />,
        <Challan key="challan" />,
        <Invoice key="invoice" />,
    ];

    const currentComponent =
        activeStep >= 0 && activeStep < stepComponents.length
            ? stepComponents[activeStep]
            : <div>Unknown Step</div>;

    return (
        <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
            <Box sx={{ width: "20%", display: "flex", flexDirection: "column", gap: 2 }}>
                <ClientDetailsCard />
                <EnquiryDetailsCard />
            </Box>
            <Box sx={{ width: "60%", display: "flex", flexDirection: "column", gap: 2 }}>
                <ProgressBar />
                {currentComponent}
            </Box>
            <Box sx={{ width: "20%" }}>
                <ActivityCard />
            </Box>
        </Box>
    );
};

export default RenderEnquiryDetails;