import { removeSpecialCharsFromStr } from "./removeSpecialCharsFromStr";

export const makeStrURLFriendly = (str: string) => {
  if (!str || typeof str !== "string") return "";

  return removeSpecialCharsFromStr(str.toLowerCase()).replaceAll(" ", "-");
};
