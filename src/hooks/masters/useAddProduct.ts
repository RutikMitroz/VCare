import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { ADD_PRODUCT } from "../../constants/urls";

const addProduct = async (productData: any) => {
  try {
    const res = await makeRequest<{
      success: boolean;
      status: string;
      message: string;
      data: any;
    }>({
      method: "POST",
      pathname: ADD_PRODUCT,
      values: productData,
      showMessage: true,
      show_success_message: true,
      show_error_message: true,
    });

    if (!res) {
      console.error("Error: Invalid API response", res);
      throw new Error("Failed to add product");
    }
    return res;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const useAddProduct = () => {
  return useMutation({
    mutationFn: addProduct,
  });
};
