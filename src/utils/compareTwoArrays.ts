const compareTwoArrays = (arrOne: unknown[], arrTwo: unknown[]) => {
  if (Array.isArray(arrOne) && Array.isArray(arrTwo)) {
    let result =
      arrOne.length === arrTwo.length &&
      arrOne.every((el) => arrTwo.includes(el));
    return result;
  }

  return false;
};

export default compareTwoArrays;
