export const removePropertyFromObject = <T extends Record<string, any>>(
  queryObj: T,
  ...keys: (keyof T)[]
): Partial<T> => {
  const queryObjCopy = { ...queryObj };

  for (const key of keys) {
    delete queryObjCopy[key];
  }

  return queryObjCopy;
};
