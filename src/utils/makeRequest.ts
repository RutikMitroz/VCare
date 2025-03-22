import axios, { AxiosRequestConfig } from "axios";
import { getCookie } from "./getCookie";
import {
  HEADERS_WITH_JSON,
  HEADERS_WITH_TOKEN,
  HEADERS_WITH_TOKEN_AND_JSON,
} from "./headers";
import showToast from "./showToast";

// Define the parameters type for makeRequest
interface MakeRequestParams {
  pathname: string;
  method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
  isNewRequest?: boolean;
  values?: any; // Adjust the type of 'values' based on your actual usage
  params?: Record<string, any>;
  showMessage?: boolean;
  show_success_message?: boolean;
  show_error_message?: boolean;
  show_fallback?: boolean;
  success_message?: string;
  error_message?: string;
  token?: boolean;
  isFormData?: boolean;
  type?: UrlKeys;
  abortController?: AbortController;
  abortControllerSignal?: AbortSignal;
}
interface ApiResponse<T> {
  status: string;
  code: number;
  message?: string;
  error?: { isOperational: boolean; status: string; statusCode: number };
  payload?: T;
}

type UrlKeys = "payment" | "api";

interface Urls {
  payment: string;
  api: string;
}

// Utility function to get the appropriate URL based on the type
const getAppropriateURL = (urls: Urls, type: UrlKeys): string => {
  if (urls[type] && type) return urls[type];

  return "";
};

// MakeRequest function with TypeScript types
export const makeRequest =
  (urls: Urls) =>
  async <T>({
    pathname,
    method = "POST",
    isNewRequest = false,
    values,
    params,
    showMessage = false,
    show_success_message = true,
    show_error_message = true,
    show_fallback = false,
    success_message,
    error_message,
    token = false,
    isFormData = false,
    type = "api",
  }: MakeRequestParams): Promise<ApiResponse<T> | undefined> => {
    try {
      if (!urls || !type) return;

      const fetchObj =
        method.toLowerCase() === "get" || method.toLowerCase() === "delete"
          ? {}
          : { data: values };

      const login_type = getCookie("login_type");

      const response = await axios({
        method,
        url: isNewRequest
          ? pathname
          : `${getAppropriateURL(urls, type)}/${pathname}`,
        headers: {
          ...(token
            ? isFormData
              ? HEADERS_WITH_TOKEN(getCookie("token"))
              : HEADERS_WITH_TOKEN_AND_JSON(getCookie("token"))
            : HEADERS_WITH_JSON),
          ...(login_type && { "Login-Type": login_type }),
        },
        params,
        ...fetchObj,
      } as AxiosRequestConfig);

      if (showMessage) {
        if (response.data.status === "success" && show_success_message) {
          showToast(success_message ?? response.data.message, "success");
        } else if (response.data.status === "warning" && show_error_message) {
          showToast(error_message ?? response.data.message, "error");
        } else {
          if (show_fallback) {
            showToast(response.data.message, "error");
          }
        }
      }

      return { ...response.data };
    } catch (err: any) {
      if (showMessage && axios.isAxiosError(err) && err.response) {
        const errorMessage = (err.response.data as { message: string }).message; // Type assertion

        showToast(error_message ?? errorMessage, "error");

        // Do not throw error when request is cancelled
        if (err.code === "ERR_CANCELED") return;

        throw { status: "error", code: 400, message: errorMessage };
      }

      if (showMessage)
        showToast(error_message ?? "Something went wrong", "error");

      // Do not throw error when request is cancelled
      if (err.code === "ERR_CANCELED") return;

      throw { status: "error", code: 400, message: "Something went wrong" };
    }
  };
