import { makeRequest as _makeRequest } from "../utils/makeRequest";

const urls = {
  payment: import.meta.env.VITE_PAYMENTS_URL,
  api: import.meta.env.VITE_API_URL,
};
export const makeRequest = _makeRequest(urls);
