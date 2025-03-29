import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { useGetComplaintById } from "../../hooks/complaints/useGetComplaintById";
import ClientDetailsCard from "../ui/Cards/ClientDetailsCard";
import EnquiryDetailsCard from "../ui/Cards/EnquiryDetailsCard";
import ActivityCard from "../ui/Cards/ActivityCard";

const RenderComplaintsDetails = () => {
  const { complaintsId } = useParams<{ complaintsId: string }>();
  const {data:complaintDetail}=useGetComplaintById(complaintsId)
  

  return (
    // <Box sx={{ width: "100%", display: "flex", gap: 2 }}>hiii{complaintsId}</Box>
    <Box sx={{ width: "100%", display: "flex", gap: 2 }}>
            <Box sx={{ width: "20%", display: "flex", flexDirection: "column", gap: 2 }}>
                <ClientDetailsCard clientDetails={complaintDetail?.data?.client_id} />
                <EnquiryDetailsCard enquiryDetails={complaintDetail?.data} Type="Complaint"/>
            </Box>
            {/* <Box sx={{ width: "60%", display: "flex", flexDirection: "column", gap: 2 }}>
                <ProgressBar
                    enquiryDetails={data?.data}
                    displayedStep={displayedStep !== null ? displayedStep : getActiveStep()}
                    onStepClick={handleStepClick}
                />
                {data?.data && renderComponent()}
            </Box> */}
            <Box sx={{ width: "20%" }}>
                <ActivityCard />
            </Box>
        </Box>
  );
};

export default RenderComplaintsDetails;
