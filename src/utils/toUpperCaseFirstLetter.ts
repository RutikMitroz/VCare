export const toUpperCaseFirstLetter = (word: string) => {
  if (!word || !(typeof word === "string" && word.toString().trim())) return "";
  return word.toString().charAt(0).toUpperCase() + word.toString().slice(1);
};
