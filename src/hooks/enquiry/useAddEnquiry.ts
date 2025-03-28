import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { ADD_ENQUIRY } from "../../constants/urls";

const addEnquiry = async (enquiryData: any) => {
  try {
    const res = await makeRequest<{
      success: boolean;
      status: string;
      message: string;
      data: any;
    }>({
      method: "POST",
      pathname: ADD_ENQUIRY,
      // token: true,
      values: enquiryData,
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

export const useAddEnquiry = () => {
  return useMutation({
    mutationFn: addEnquiry,
  });
};
