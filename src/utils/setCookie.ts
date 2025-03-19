import nookies from "nookies";

const cookieOptions = Object.freeze({ path: "/", maxAge: 1 * 24 * 60 * 60 }); // Cookie expires in 1 day

export const setCookie = (key: string, value: string) =>
  nookies.set(undefined, key, value, cookieOptions);
