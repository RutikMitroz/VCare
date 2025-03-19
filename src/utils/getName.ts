export const getName = (
  first_name: string,
  middle_name: string,
  last_name: string
) => {
  let name = "";

  if (first_name) name = first_name;
  if (middle_name) name = name + " " + middle_name;
  if (last_name) name = name + " " + last_name;

  return name.trim();
};
