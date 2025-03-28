import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { GET_ALL_COMPLAINTS } from "../../constants/urls";

interface fetchComplaintsParams {
  page: number;
  limit: number;
}


const fetchComplaints = async ({ page, limit }:fetchComplaintsParams) => {
  const res = await makeRequest({
    pathname: GET_ALL_COMPLAINTS,
    method: "GET",
    params: { page, limit },
  });
  return res;
};

export const useGetAllComplaints = ({ page, limit }:fetchComplaintsParams) => {
  return useQuery({
    queryKey: ["complaints"],
    queryFn: () => fetchComplaints({ page, limit }),
  });
};
