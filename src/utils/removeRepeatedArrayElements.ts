export const removeRepeatedArrayElements = <T>(arr: T[], key: keyof T): T[] => {
  const uniqueIdsMap: Record<string, boolean> = {};

  return arr.filter((el) => {
    const id = el[key] as string;
    if (uniqueIdsMap[id]) return false;
    uniqueIdsMap[id] = true;
    return true;
  });
};
