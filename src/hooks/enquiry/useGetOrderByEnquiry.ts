import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { GET_ORDERS_BY_ENQUIRY_ID } from "../../constants/urls";

const fetchOrderByEnquiryId = async (enquiryId: string) => {
  const res = await makeRequest({
    pathname: GET_ORDERS_BY_ENQUIRY_ID(enquiryId),
    method: "GET",
  });
  return res;
};

export const useGetOrderByEnquiryId = (enquiryId: string) => {
  return useQuery({
    queryKey: ["order-by-enquiry-id", enquiryId],
    queryFn: () => fetchOrderByEnquiryId(enquiryId),
    enabled: !!enquiryId,
  });
};
