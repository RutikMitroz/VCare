import Box from "@mui/material/Box";
import { useMediaQuery } from "@mui/material";

import StatusChip from "../StatusChip";

const CardLineItem = ({
  label,
  icon,
  value,
  typography = "subtitle2",
  directionColumnAt,
  labelWidth = "14ch",
  rootStyles = {},
  valueStyles = {},
  showColon = true,
  mode = "default",
  show_as_chip = false,
  ShowCustomComponent,
  options = {},
}) => {
  const maxWidthCustom = useMediaQuery(`(max-width: ${directionColumnAt}px)`);

  const Value = ({ labelWidth }) => {
    return ShowCustomComponent ? (
      ShowCustomComponent({ labelWidth })
    ) : show_as_chip ? (
      <Box
        sx={{
          typography,
          marginLeft: labelWidth ? "1rem" : "4rem",
          width:
            mode === "full-width"
              ? "max-content"
              : labelWidth
                ? `calc(100% - ${labelWidth} - 16px)`
                : "calc(100% - 16px)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          ...valueStyles,
        }}
      >
        <StatusChip
          label={value}
          chip_color_mappings={options?.chip_color_mappings}
        />
      </Box>
    ) : (
      <Box
        sx={{
          typography,
          marginLeft: labelWidth ? "1rem" : "4rem",
          width:
            mode === "full-width"
              ? "max-content"
              : labelWidth
                ? `calc(100% - ${labelWidth} - 16px)`
                : "calc(100% - 16px)",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          ...valueStyles,
        }}
      >
        {value}
      </Box>
    );
  };

  return value || ShowCustomComponent ? (
    maxWidthCustom ? (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {icon && (
            <Box
              component="img"
              sx={{
                height: "2rem",
                width: "1.8rem",
                objectFit: "contain",
                marginRight: "1rem",
              }}
              src={icon}
              alt={label}
            />
          )}

          <Box
            sx={{
              typography,
              fontWeight: 600,
              width: labelWidth,
              display: "inline-block",
            }}
          >
            {label}
          </Box>
        </Box>

        <Value />
      </Box>
    ) : (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "max-content",

          ...(mode === "full-width" && { justifyContent: "space-between" }),

          ...rootStyles,
        }}
      >
        {icon && (
          <Box
            component="img"
            sx={{
              height: "2rem",
              width: "1.8rem",
              objectFit: "contain",
              marginRight: "1rem",
            }}
            src={icon}
            alt={label}
          />
        )}

        <Box
          sx={{
            typography,
            fontWeight: 600,
            width: labelWidth,
            display: "inline-block",
          }}
        >
          {label}
        </Box>

        {showColon === true && mode === "default" && (
          <Box sx={{ fontWeight: 600 }}>:</Box>
        )}

        <Value labelWidth={labelWidth} />
      </Box>
    )
  ) : null;
};

export default CardLineItem;
