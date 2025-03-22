import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { GET_ALL_CLIENTS } from "../../constants/urls";

const fetchClients = async () => {
  const res = await makeRequest({
    pathname: GET_ALL_CLIENTS,
    method: "GET",
  });
  return res;
};

export const useGetClients = () => {
  return useQuery({
    queryKey: ["clients"],
    queryFn: () => fetchClients(),
  });
};
