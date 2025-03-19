export const getItemFromLocalStorage = (key: string) => {
  if (!key) return "";

  if (typeof window !== "undefined") {
    if (
      window.localStorage.getItem(key) === "null" ||
      window.localStorage.getItem(key) === "undefined"
    )
      return "";

    if (window?.localStorage?.getItem(key))
      return window.localStorage.getItem(key)?.trim();
  }

  return "";
};
