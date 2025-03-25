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

    const renderComponent = () => {
        const enquiryDetails = data?.data;

        const hasQuotations = enquiryDetails?.status === "quotation_created";
        const hasOrders = enquiryDetails?.status === "order_created";
        const hasChallans = enquiryDetails?.status === "challan_created";

        if (hasChallans) {
            return <Invoice enquiryDetails={enquiryDetails} />;
        } else if (hasOrders) {
            return <Challan enquiryDetails={enquiryDetails} />;
        } else if (hasQuotations) {
            return <Order enquiryDetails={enquiryDetails} />;
        } else {
            return <Quotation enquiryDetails={enquiryDetails} />;
        }
    };

    return (
        <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
            <Box sx={{ width: "20%", display: "flex", flexDirection: "column", gap: 2 }}>
                <ClientDetailsCard clientDetails={data?.data?.client_id} />
                <EnquiryDetailsCard enquiryDetails={data?.data} />
            </Box>
            <Box sx={{ width: "60%", display: "flex", flexDirection: "column", gap: 2 }}>
                <ProgressBar enquiryDetails={data?.data} />
                {data?.data && renderComponent()}
            </Box>
            <Box sx={{ width: "20%" }}>
                <ActivityCard />
            </Box>
        </Box>
    );
};

export default RenderEnquiryDetails;