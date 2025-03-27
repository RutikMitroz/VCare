import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { GET_ALL_ORDERS } from "../../constants/urls";

interface FetchOrdersParams {
    page: number;
    limit: number;
  }
  
  const fetchOrders = async ({ page, limit }: FetchOrdersParams) => {
    const res = await makeRequest({
      pathname: GET_ALL_ORDERS,
      method: "GET",
      params: { page, limit },
    });
    return res;
  };
  
  export const useGetAllOrders = ({ page, limit }: FetchOrdersParams) => {
    return useQuery({
      queryKey: ["orders", page, limit],
      queryFn: () => fetchOrders({ page, limit }),
    });
  };
  


