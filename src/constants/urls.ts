// Enquiries urls
export const GET_ALL_ENQUIRIES = "api/enquiry/getEnquiry";
export const GET_ENQUIRY_BY_ID = (enquiryId: string) =>
  `api/enquiry/getEnquiryById/${enquiryId}`;
export const ADD_ENQUIRY = "api/enquiry/addEnquiry";

//Quotations urls
export const CREATE_QUOTATION = "api/quotation/create";

export const GET_ALL_CLIENTS = "api/client/get";
export const GET_ALL_SALESMAN = "api/user/salesman";
