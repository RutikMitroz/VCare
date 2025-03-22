export const displayShortId = (id: string): string => {
  if (!id || typeof id !== "string") return ""; 
  if (id.length < 5) return id;

  return id.slice(-5);
};
