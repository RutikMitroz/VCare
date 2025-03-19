import React, { useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

interface CustomTextFieldProps
  extends Omit<TextFieldProps, "type" | "onChange" | "onBlur"> {
  id: string;
  type?: "text" | "password" | "number";
  label: string;
  value: string | number;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  customHelperText?: string;
  errors?: string;
  touched?: boolean;
  required?: boolean;
  disabled?: boolean;
  customRef?: React.RefObject<HTMLInputElement>;
  style?: React.CSSProperties;
  otherProps?: any; // Adjust the type as per otherProps if needed
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  id,
  type = "text",
  label,
  value,
  handleChange,
  handleBlur,
  customHelperText = "",
  errors,
  touched,
  required = true,
  disabled = false,
  customRef,
  style = {},
  ...otherProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      id={id}
      variant="outlined"
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      value={value}
      label={label}
      error={!!(errors && touched)}
      helperText={errors && touched ? errors : customHelperText}
      onChange={handleChange}
      onBlur={handleBlur}
      required={required}
      inputRef={customRef}
      disabled={disabled}
      InputLabelProps={{ sx: { fontSize: "1.6rem" } }}
      InputProps={{
        ...(type === "password" && {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                disabled={disabled}
                aria-label="toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
                onMouseDown={(event) => event.preventDefault()}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }),
        sx: { height: "5rem", fontSize: "1.6rem" },
      }}
      {...otherProps}
      sx={{
        width: "100% !important",
        fontFamily: "Montserrat !important",
        backfaceVisibility: "hidden",
        ...style,
      }}
    />
  );
};

export default CustomTextField;
