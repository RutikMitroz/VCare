export const setItemToLocalStorage = (key: string, value: string = "") => {
  if (!key) return "";
  return typeof window !== "undefined"
    ? window.localStorage.setItem(key, value)
    : "";
};
