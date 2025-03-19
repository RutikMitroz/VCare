import React from "react";
import { Link } from "react-router-dom";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { SxProps, Theme } from "@mui/material";

interface GetIconProps {
  Icon?: React.ElementType | JSX.Element;
  style?: React.CSSProperties;
}

const GetIcon: React.FC<GetIconProps> = ({ Icon, style }) => {
  if (Icon) {
    // If Icon is a JSX element (like <AddIcon />)
    if (React.isValidElement(Icon)) {
      return React.cloneElement(Icon);
    }

    // If Icon is a component reference (like AddIcon)
    const IconComponent = Icon as React.ElementType;
    return <IconComponent sx={{ fontSize: "25px", ...style }} />;
  }

  return null;
};

interface CustomButtonAdvProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  href?: string;
  hrefExt?: string;
  isActive?: boolean;
  variant?: "text" | "outlined" | "contained";
  color?:
    | "inherit"
    | "success"
    | "error"
    | "primary"
    | "secondary"
    | "info"
    | "warning";
  type?: "button" | "submit" | "reset";
  Icon?: React.ElementType | JSX.Element;
  enableIcon?: boolean;
  IconDirection?: "left" | "right";
  disabled?: boolean;
  loading?: boolean;
  fn?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  rootStyles?: SxProps<Theme>;
  buttonStyles?: React.CSSProperties;
  customRef?: React.RefObject<HTMLButtonElement>;
}

const CustomButtonAdv = React.forwardRef<
  HTMLButtonElement,
  CustomButtonAdvProps
>(
  (
    {
      text,
      href,
      hrefExt,
      isActive = false,
      variant = "contained",
      color = "primary",
      type = "button",
      Icon,
      enableIcon = true,
      IconDirection = "right",
      disabled,
      loading = false,
      fn,
      rootStyles,
      buttonStyles,
      ...otherProps
    },
    ref
  ) => {
    const ButtonContent = () => (
      <Box
        sx={{
          height: "45px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          padding: "0 1.5rem",
          minWidth: "12rem",
          ...buttonStyles,
        }}
      >
        {IconDirection === "right" && (
          <Box sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            {text}{" "}
            <Box
              component="span"
              sx={{ display: "flex", alignItems: "center" }}
            >
              {enableIcon ? (
                Icon ? (
                  <GetIcon Icon={Icon} />
                ) : (
                  <NavigateNextIcon sx={{ fontSize: "25px" }} />
                )
              ) : null}
            </Box>
          </Box>
        )}

        {IconDirection === "left" && (
          <Box sx={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            {enableIcon ? (
              Icon ? (
                <GetIcon Icon={Icon} />
              ) : (
                <NavigateNextIcon sx={{ fontSize: "25px" }} />
              )
            ) : null}{" "}
            {text}
          </Box>
        )}
      </Box>
    );

    return (
      <>
        <Button
          variant={variant}
          color={color}
          type={type}
          onClick={(e) => {
            if (fn) fn(e);
          }}
          disabled={loading || disabled}
          sx={{
            borderRadius: "3rem",
            fontSize: "16px",
            position: "relative",
            width: "max-content",
            padding: 0,
            height: "max-content",
            textTransform: "none",
            outline: "none",
            overflow: "hidden",
            ...(isActive && { border: "none" }),
            ...(isActive && { backgroundColor: "#F7F7F7" }),

            "& a": {
              color:
                variant === "outlined" || variant === "text"
                  ? "custom.blue_1"
                  : "custom.white",
              textDecoration: "none",
              borderRadius: "3rem",
              ...(isActive && { border: "none" }),
              ...(isActive && { backgroundColor: "#F7F7F7" }),
            },

            ...rootStyles,
          }}
          ref={ref}
          {...otherProps}
        >
          {!loading ? (
            href ? (
              <Link to={href}>
                <ButtonContent />
              </Link>
            ) : hrefExt ? (
              <a
                href={hrefExt}
                target="_blank"
                rel="noreferrer"
                style={{ width: "100%" }}
              >
                <ButtonContent />
              </a>
            ) : (
              <ButtonContent />
            )
          ) : (
            <Box
              sx={{
                height: "45px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: "0 1.5rem",
                minWidth: "12rem",
                ...buttonStyles,
              }}
            >
              <CircularProgress
                color="primary"
                sx={{ height: "30px", width: "30px", margin: "auto" }}
              />
            </Box>
          )}
        </Button>
      </>
    );
  }
);

export default CustomButtonAdv;

// const Button = () => {
//   return <button>hello</button>;
// };

// export default Button;
