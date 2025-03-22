
// Enquiries urls
export const GET_ALL_ENQUIRIES = "api/enquiry/getEnquiry";
export const GET_ENQUIRY_BY_ID = (enquiryId: string) =>
  `api/enquiry/getEnquiryById/${enquiryId}`;
export const ADD_ENQUIRY = "api/enquiry/addEnquiry";

// client urls
export const ADD_CLIENT = "api/client/add";
export const GET_ALL_CLIENTS = "api/client/get";

// user urls
export const ADD_USER = "api/user/add";