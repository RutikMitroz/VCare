import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { GET_ALL_CATEGORIES } from "../../constants/urls";

const fetchCategories = async () => {
  const res = await makeRequest({
    pathname: GET_ALL_CATEGORIES,
    method: "GET",
  });
  return res?.data;
};

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
  });
};
