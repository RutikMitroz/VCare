const truncateString = (str: string, num: number) => {
  if (!str) return;

  if (str.trim().length < num || !num) return str.trim();

  return str.slice(0, num) + " ...";
};

export default truncateString;
