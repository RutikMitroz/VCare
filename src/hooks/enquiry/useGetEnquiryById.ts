import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { GET_ENQUIRY_BY_ID } from "../../constants/urls";

const fetchEnquiryById = async (enquiryId: string) => {
  const res = await makeRequest({
    pathname: GET_ENQUIRY_BY_ID(enquiryId),
    method: "GET",
  });
  return res;
};

export const useGetEnquiryById = (enquiryId: string) => {
  return useQuery({
    queryKey: ["enquiry-by-id", enquiryId],
    queryFn: () => fetchEnquiryById(enquiryId),
    enabled: !!enquiryId,
  });
};
