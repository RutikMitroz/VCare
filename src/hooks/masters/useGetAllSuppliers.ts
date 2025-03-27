import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { GET_ALL_SUPPLIERS } from "../../constants/urls";

const fetchAllSuppliers = async () => {
  const res = await makeRequest({
    pathname: GET_ALL_SUPPLIERS,
    method: "GET",
  });
  return res?.data;
};

export const useGetAllSuppliers = () => {
  return useQuery({
    queryKey: ["suppliers"],
    queryFn: () => fetchAllSuppliers(),
  });
};
