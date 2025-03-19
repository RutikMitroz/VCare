import { NavLink } from "react-router-dom";

import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

import { getRatingsColor } from "@medlivery/utils/getRatingsColor";

export default function RatingBox({
  urlToRedirect = "",
  ratings_average,
  ratings_quantity,
  noLink = true,
}) {
  const Content = ({ ratings_average, ratings_quantity, isLink }) => {
    return (
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Box
          sx={{
            fontSize: "1.3rem",
            color: "white",
            backgroundColor: getRatingsColor(ratings_average),
            display: "flex",
            alignItems: "center",
            padding: ".3rem .5rem",
            borderRadius: ".5rem",
            boxShadow: 3,
          }}
        >
          {ratings_average} <StarIcon sx={{ fontSize: "1.3rem" }} />
        </Box>

        <Box
          sx={{
            width: "max-content",
            typography: "subtitle3",
            color: "#0075FC",
            borderBottom: `1px solid transparent`,
            fontWeight: 600,
            "&:hover": {
              ...(isLink === true && {
                borderBottom: `1px solid #0075FC`,
              }),
            },
          }}
        >
          {ratings_quantity} {ratings_quantity === 1 ? "rating" : "ratings"}
        </Box>
      </Box>
    );
  };

  return noLink ? (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {ratings_quantity === 0 ? (
        <Box component="span" sx={{ fontSize: "1.5rem", color: "#0075FC" }}>
          No Reviews
        </Box>
      ) : (
        <Content
          ratings_average={ratings_average}
          ratings_quantity={ratings_quantity}
        />
      )}
    </Box>
  ) : (
    <Box
      sx={{
        textDecoration: "none",
        display: "flex",
        alignItems: "center",

        "& a": { textDecoration: "none" },
      }}
    >
      <NavLink to={urlToRedirect}>
        {ratings_quantity === 0 ? (
          <Box
            component="span"
            sx={{
              fontSize: "1.4rem",
              color: "orange",
              borderBottom: "1px solid orange",
            }}
          >
            No Reviews
          </Box>
        ) : (
          <Content
            ratings_average={ratings_average}
            ratings_quantity={ratings_quantity}
            isLink={noLink || urlToRedirect ? true : false}
          />
        )}
      </NavLink>
    </Box>
  );
}
