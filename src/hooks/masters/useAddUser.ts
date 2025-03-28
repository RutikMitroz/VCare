import { useMutation } from "@tanstack/react-query";
import { ADD_USER } from "../../constants/urls";
import { makeRequest } from "../../constants/makeRequest";

interface UserData {
  user_name: string;
  user_email: string;
  user_phone: string;
  user_role: string;
  user_address: string;
  successCB?: () => void;
}

interface UserResponseData {
  _id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  user_role: string;
  user_address: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  message: string;
  data: UserResponseData;
}

const addUser = async ({user_name, user_email, user_phone, user_role, user_address, successCB}: UserData) => {
  try {
    const response = await makeRequest<ApiResponse>({
      method: "POST",
      pathname: ADD_USER,
      token: true,
      values: {
        user_name,
        user_email,
        user_phone,
        user_role,
        user_address
      },
      showMessage: true,
      show_success_message: true,
      show_error_message: true,
    });

    if (!response || !response.data) {
      console.error("Error: Invalid API response", response);
      throw new Error(response?.message || "Failed to add user");
    }

    console.log("✅ Success Callback Called!");
    successCB?.();
    return response;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const useAddUser = () => {
  return useMutation({
    mutationFn: addUser,
  });
};
