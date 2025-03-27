import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { GET_PRODUCT_BY_PRODUCT_BARCODE } from "../../constants/urls";

const fetchProductByBarCode = async (product_barcode: string) => {
  const res = await makeRequest({
    pathname: GET_PRODUCT_BY_PRODUCT_BARCODE(product_barcode),
    method: "GET",
  });
  return res;
};

export const useGetProductByBarCode = (product_barcode: string) => {
  return useQuery({
    queryKey: ["product-by-barcode", product_barcode],
    queryFn: () => fetchProductByBarCode(product_barcode),
    enabled: !!product_barcode,
  });
};
