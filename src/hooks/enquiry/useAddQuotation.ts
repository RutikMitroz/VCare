import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { CREATE_QUOTATION } from "../../constants/urls";

const addQuotation = async (quotationData: any) => {
  try {
    const res = await makeRequest<{
      success: boolean;
      status: string;
      message: string;
      data: any;
    }>({
      method: "POST",
      pathname: CREATE_QUOTATION,
      values: quotationData,
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

export const useAddQuotation = () => {
  return useMutation({
    mutationFn: addQuotation,
  });
};
