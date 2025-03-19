export const getRatingsColor = (ratings_average: number) => {
  if (ratings_average > 4 && ratings_average <= 5) return "green";
  if (ratings_average > 2 && ratings_average <= 4) return "orange";
  if (ratings_average > 0 && ratings_average <= 2) return "red";

  return "orange";
};
