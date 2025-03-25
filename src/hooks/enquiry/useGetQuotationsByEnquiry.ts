import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { GET_QUOTATIONS_BY_ENQUIRY_ID } from "../../constants/urls";

const fetchQuotationsByEnquiryId = async (enquiryId: string) => {
  const res = await makeRequest({
    pathname: GET_QUOTATIONS_BY_ENQUIRY_ID(enquiryId),
    method: "GET",
  });
  return res;
};

export const useGetQuotationsByEnquiryId = (enquiryId: string) => {
  return useQuery({
    queryKey: ["quotations-by-enquiry-id", enquiryId],
    queryFn: () => fetchQuotationsByEnquiryId(enquiryId),
    enabled: !!enquiryId,
  });
};
