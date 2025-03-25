import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { GET_ALL_PRODUCTS } from "../../constants/urls";

const fetchProducts = async (search: string) => {
  const res = await makeRequest({
    pathname: GET_ALL_PRODUCTS,
    method: "GET",
    params: { search },
  });
  return res?.data;
};

export const useGetProducts = (search: string) => {
  return useQuery({
    queryKey: ["products", search],
    queryFn: () => fetchProducts(search),
  });
};
