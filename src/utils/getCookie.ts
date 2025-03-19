import nookies from "nookies";

export const getCookie = (cname: string) => {
  const cookies = nookies.get(undefined);
  return cookies[cname];
};
