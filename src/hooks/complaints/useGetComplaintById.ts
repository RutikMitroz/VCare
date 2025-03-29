import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { GET_COMPLAINT_BY_ID } from "../../constants/urls";

const fetchComplaintById = async (id: string) => {
  const res = await makeRequest({
    pathname: GET_COMPLAINT_BY_ID(id),
    method: "GET",
  });
  return res;
};

export const useGetComplaintById = (id: string) => {
  return useQuery({
    queryKey: ["complaint_by_id", id],
    queryFn: () => fetchComplaintById(id),
    enabled: !!id,
  });
};
