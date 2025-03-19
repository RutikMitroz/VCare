import React, { ChangeEvent, TextareaHTMLAttributes } from "react";
import { Box, FormHelperText, SxProps, Theme } from "@mui/material";

interface CustomTextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  value: string;
  id: string;
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
  required?: boolean;
  errors?: string;
  touched?: boolean;
  customHelperText?: string;
  rootStyles?: SxProps<Theme>;
  inputStyles?: SxProps<Theme>;
}

const CustomTextArea: React.FC<CustomTextAreaProps> = ({
  label,
  value,
  id,
  handleChange,
  disabled = false,
  required = false,
  errors = "",
  touched = false,
  customHelperText = "",
  rootStyles,
  inputStyles,
  ...otherProps
}) => {
  const errorBool = Boolean(errors && touched);

  return (
    <Box sx={{ width: "100%", ...rootStyles }}>
      {label && (
        <Box
          sx={{
            typography: "subtitle2",
            paddingLeft: "1rem",
            ...(errorBool && { color: "red" }),
          }}
        >
          {label}
        </Box>
      )}

      <Box
        component="textarea"
        value={value}
        id={id}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        sx={{
          marginTop: ".25rem",
          outline: "none",
          border: errorBool ? "1px solid red" : "1px solid #9b9b9b",
          borderRadius: "1rem",
          width: "100%",
          resize: "none",
          padding: ".5rem 1rem",
          fontSize: "1.4rem",
          height: "10rem",
          ...inputStyles,
        }}
        {...otherProps}
      />

      {(errorBool || customHelperText) && (
        <FormHelperText
          sx={{
            typography: "subtitle2",
            padding: ".5rem 0 0 1rem",
            margin: 0,
            color: errorBool ? "red" : "black",
          }}
        >
          {errorBool ? errors : customHelperText}
        </FormHelperText>
      )}
    </Box>
  );
};

export default CustomTextArea;
