import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { CREATE_ORDER } from "../../constants/urls";

const createOrder = async (orderData: any) => {
  try {
    const res = await makeRequest<{
      success: boolean;
      status: string;
      message: string;
      data: any;
    }>({
      method: "POST",
      pathname: CREATE_ORDER,
      values: orderData,
      showMessage: true,
      show_success_message: true,
      show_error_message: true,
    });

    if (!res || res.status !== "success") {
      console.error("Error: Invalid API response", res);
      throw new Error(res?.message || "Failed to add lab test");
    }
    return res;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const useCreateOrder = () => {
  return useMutation({
    mutationFn: createOrder,
  });
};
