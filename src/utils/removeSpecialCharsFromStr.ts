export const removeSpecialCharsFromStr = (str: string) => {
  if (!str || typeof str !== "string") return "";

  return str.replace(/[^a-zA-Z0-9 ]/g, "");
};
