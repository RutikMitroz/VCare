// Enquiries urls
export const GET_ALL_ENQUIRIES = "api/enquiry/getEnquiry";
export const GET_ENQUIRY_BY_ID = (enquiryId: string) =>
  `api/enquiry/getEnquiryById/${enquiryId}`;
export const ADD_ENQUIRY = "api/enquiry/addEnquiry";
export const UPDATE_ENQUIRY = (enquiryId: string) =>
  `api/enquiry/updateEnquiry/${enquiryId}`;


//Quotations urls
export const CREATE_QUOTATION = "api/quotation/create";
export const GET_QUOTATIONS_BY_ENQUIRY_ID = (enquiryId: string) =>
  `api/quotation/getEnquiry/${enquiryId}`;

//Orders urls
export const CREATE_ORDER = "api/order/addOrder";
export const GET_ORDERS_BY_ENQUIRY_ID = (enquiryId: string) =>
  `api/order/getOrderByEnquiry/${enquiryId}`;

// Utilities urls
export const GET_ALL_CLIENTS = "api/client/get";
export const GET_ALL_SALESMAN = "api/user/salesman";

//Products urls
export const GET_ALL_PRODUCTS = "api/product/product-list";
// export const GET_ALL_SALESMAN = "api/user/salesman";

// client urls
export const ADD_CLIENT = "api/client/add";
// export const GET_ALL_CLIENTS = "api/client/get";

// user urls
export const ADD_USER = "api/user/add";
<<<<<<< HEAD


// order urls
export const GET_ALL_ORDERS = "api/order/getOrder";

