import { Box } from "@mui/system";
import { useParams } from "react-router-dom";

const RenderComplaintsDetails = () => {
  const { enquiryId } = useParams<{ enquiryId: string }>();

  return (
    <Box sx={{ width: "100%", display: "flex", gap: 2 }}>hiii{enquiryId}</Box>
  );
};

export default RenderComplaintsDetails;
