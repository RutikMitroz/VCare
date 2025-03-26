import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { GET_ALL_PRODUCTS } from "../../constants/urls";

interface GetAllProductsProps {
  page: number;
  limit: number;
  search: string;
}

const fetchProducts = async ({ page, limit, search }: GetAllProductsProps) => {
  const res = await makeRequest({
    pathname: GET_ALL_PRODUCTS,
    method: "GET",
    params: { page, limit, search },
  });
  return res;
};

export const useGetProducts = ({
  page,
  limit,
  search,
}: GetAllProductsProps) => {
  return useQuery({
    queryKey: ["products", page, limit, search],
    queryFn: () => fetchProducts({ page, limit, search }),
  });
};
