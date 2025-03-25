import { useMutation } from "@tanstack/react-query";
import { ADD_CLIENT } from "../../constants/urls";
import { makeRequest } from "../../constants/makeRequest";


interface ClientData {
  client_name: string;
  client_company: string;
  client_email: string;
  client_phone: string;
  client_address: string;
  mapLink: string;
  successCB?: () => void;
}

interface ClientResponseData {
  _id: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  client_company: string;
  client_address: string;
  mapLink: string;
  isDeleted: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  message: string;
  success: boolean;
  status: string;
  data: ClientResponseData;
}

const addClient = async ({client_name, client_company, client_email, client_phone, client_address, mapLink, successCB}: ClientData) => {
  try {
    const response = await makeRequest<ApiResponse>({
      method: "POST",
      pathname: ADD_CLIENT,
      token: true,
      values: {
        client_name,
        client_company,
        client_email,
        client_phone,
        client_address,
        mapLink
      },
      showMessage: true,
      show_success_message: true,
      show_error_message: true,
    });

    // Check if response exists and has the expected structure
    if (!response || response.status !== "success") {
      console.error("Error: Invalid API response", response);
      throw new Error(response?.message || "Failed to add client");
    }
    successCB?.();
    return response;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const useAddClient = () => {
  return useMutation({
    mutationFn: addClient,
  });
};
