import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { ADD_COMPLAINT } from "../../constants/urls";

const addComplaint = async (categoryData: any) => {
  try {
    const res = await makeRequest<{
      success: boolean;
      status: string;
      message: string;
      data: any;
    }>({
      method: "POST",
      pathname: ADD_COMPLAINT,
      values: categoryData,
      showMessage: true,
      show_success_message: true,
      show_error_message: true,
    });

    if (!res) {
      console.error("Error: Invalid API response", res);
      throw new Error("Failed to add category");
    }
    return res;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const useAddComplaint = () => {
  return useMutation({
    mutationFn: addComplaint,
  });
};
