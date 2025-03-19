import { nanoid } from "nanoid";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  SxProps,
  Theme,
} from "@mui/material";

interface RadioOption {
  value: string;
  label: string;
  isVisible?: boolean;
}

interface CustomRadioButtonsProps {
  heading: string;
  name: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  radioOptions: RadioOption[];
  errors?: string;
  touched?: boolean;
  disabled?: boolean;
  direction?: "row" | "column";
  labelWidth?: string;
  rootStyles?: SxProps<Theme>;
}

const styles = {
  rootStylesWhenRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  labelWhenRow: { width: "max-content" },

  radioGroupWhenRow: { marginTop: 0, marginLeft: "1.5rem" },
};

const CustomRadioButtons: React.FC<CustomRadioButtonsProps> = ({
  heading,
  name,
  value,
  handleChange,
  radioOptions,
  errors,
  touched,
  disabled = false,
  direction = "column",
  labelWidth = "",
  rootStyles = {},
}) => {
  const errorBool = Boolean(errors && touched);

  return (
    <FormControl
      component="fieldset"
      sx={{
        // @ts-ignore
        width: "100%",
        ...rootStyles,
        ...(direction === "row" && styles.rootStylesWhenRow),

        "& .MuiFormLabel-root": {
          ...(labelWidth ? { width: labelWidth } : {}),
        },
      }}
    >
      <FormLabel
        component="label"
        sx={{
          color: errorBool ? "red" : "black",
          fontSize: "1.6rem",
          ...(direction === "row" && styles.labelWhenRow),
        }}
      >
        {heading}
      </FormLabel>

      <RadioGroup
        row={direction === "row"}
        aria-label={name}
        name={name}
        value={value}
        onChange={handleChange}
        sx={{
          width: "max-content",
          flexWrap: "wrap",
          marginTop: "1rem",
          marginLeft: "1rem",
          ...(direction === "row" && styles.radioGroupWhenRow),

          "& .MuiRadio-root": { padding: "0 9px" },

          "& svg": { fontSize: "2rem", color: "custom.light" },
        }}
      >
        {radioOptions
          .filter((el) => el.isVisible !== false)
          .map((el) => (
            <FormControlLabel
              key={nanoid()}
              value={el.value}
              label={el.label}
              control={
                <Radio
                  color="primary"
                  disabled={disabled}
                  sx={{ fontSize: "1.6rem" }}
                />
              }
              sx={{
                userSelect: "none",
                color: errorBool ? "red" : "#636363",
                "& .MuiFormControlLabel-label": { fontSize: "1.6rem" },
              }}
            />
          ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioButtons;
