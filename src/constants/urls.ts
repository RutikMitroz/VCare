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
export const GET_ALL_ORDERS = "api/order/getOrder";
export const CREATE_ORDER = "api/order/addOrder";
export const GET_ORDERS_BY_ENQUIRY_ID = (enquiryId: string) =>
  `api/order/getOrderByEnquiry/${enquiryId}`;

//Challan urls
export const CREATE_CHALLAN = "api/challan/add";

// Utilities urls
export const GET_ALL_CLIENTS = "api/client/get";
export const GET_ALL_SALESMAN = "api/user/salesman";

//Categories urls
export const ADD_CATEGORY = "api/category/addCategory";
export const GET_ALL_CATEGORIES = "api/category/get";

//Products urls
export const ADD_PRODUCT = "api/product/addProduct";
export const GET_ALL_PRODUCTS = "api/product/product-list";

// client urls
export const ADD_CLIENT = "api/client/add";

//Suppliers urls
export const ADD_SUPPLIER = "api/supplier/add";
export const GET_ALL_SUPPLIERS = "api/supplier/get";

// user urls
export const ADD_USER = "api/user/add";
export const GET_ALL_USERS = "api/user/get";

//inventory urls
export const GET_PRODUCT_BY_PRODUCT_BARCODE = (product_barcode: string) =>
  `api/inventory/ByBarcode/${product_barcode}`;
export const ADD_GRN = "api/inventory/addInventory";
