import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { ADD_SUPPLIER } from "../../constants/urls";

const addSupplier = async (supplierData: any) => {
  try {
    const res = await makeRequest<{
      success: boolean;
      status: string;
      message: string;
      data: any;
    }>({
      method: "POST",
      pathname: ADD_SUPPLIER,
      values: supplierData,
      showMessage: true,
      show_success_message: true,
      show_error_message: true,
    });

    if (!res) {
      console.error("Error: Invalid API response", res);
      throw new Error("Failed to add supplier");
    }
    return res;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const useAddSupplier = () => {
  return useMutation({
    mutationFn: addSupplier,
  });
};
