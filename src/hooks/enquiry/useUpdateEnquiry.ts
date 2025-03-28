import { useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../constants/makeRequest";
import { UPDATE_ENQUIRY } from "../../constants/urls";

interface UpdateEnquiryProps {
  enquiryData: any;
  enquiryId: string;
}

const updateEnquiry = async ({
  enquiryData,
  enquiryId,
}: UpdateEnquiryProps) => {
  try {
    const res = await makeRequest<{
      data: any;
    }>({
      method: "PUT",
      pathname: UPDATE_ENQUIRY(enquiryId),
      // token: true,
      values: enquiryData,
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

export const useUpdateEnquiry = () => {
  return useMutation({
    mutationFn: updateEnquiry,
  });
};
