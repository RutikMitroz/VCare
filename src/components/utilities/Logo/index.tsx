import { Link } from "react-router-dom";

import { Box } from "@mui/material";

interface LogoProps {
  src: string;
  alt?: string;
  rootStyles?: React.CSSProperties;
  isLink?: boolean;
  link?: string;
}

const Logo: React.FC<LogoProps> = ({ src, alt, rootStyles = {}, isLink, link }) => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "2rem",
        width: "6rem",

        ...rootStyles,

        "& img": { height: "100%", width: "100%", objectFit: "contain" },
      }}
    >
      {isLink && link ? (
        <Link to={link}>
          <Box style={{ cursor: "pointer" }}>
            <img src={src ?? "/assets/logos/V_Care_logo.png"} alt={alt ?? "V-Care"} />
          </Box>
        </Link>
      ) : (
        <img src={src ?? "/assets/logos/V_Care_logo.png"} alt={alt ?? "V-Care"} />
      )}
    </Box>
  );
};

export default Logo;
