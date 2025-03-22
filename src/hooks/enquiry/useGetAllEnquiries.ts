import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { GET_ALL_ENQUIRIES } from "../../constants/urls";

interface fetchEnquiriesParams {
  page: number;
  limit: number;
}

const fetchEnquiries = async ({ page, limit }: fetchEnquiriesParams) => {
  const res = await makeRequest({
    pathname: GET_ALL_ENQUIRIES,
    method: "GET",
    params: { page, limit },
  });
  return res;
};

export const useGetEnquiries = ({ page, limit }: fetchEnquiriesParams) => {
  return useQuery({
    queryKey: ["enquiries", page, limit],
    queryFn: () => fetchEnquiries({ page, limit }),
  });
};
