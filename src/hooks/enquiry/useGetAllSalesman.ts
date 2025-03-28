import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { GET_ALL_SALESMAN } from "../../constants/urls";

const fetchSalesman = async () => {
  const res = await makeRequest({
    pathname: GET_ALL_SALESMAN,
    method: "GET",
  });
  return res;
};

export const useGetSalesman = () => {
  return useQuery({
    queryKey: ["salesman"],
    queryFn: () => fetchSalesman(),
  });
};
