import React from "react";

import TextField from "@mui/material/TextField";
import { Box } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";

interface CustomDateInputProps {
  id: string;
  value: Date | null;
  label: string;
  handleChange: (id: string, newValue: Date | null) => void;
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  errors?: string;
  touched?: boolean;
  disabled?: boolean;
  datePickerProps?: Partial<DatePickerProps<Date | null, Date>>;
  customHelperText?: string;
}

function CustomDateInput({
  id,
  value,
  label,
  handleChange,
  handleBlur,
  errors,
  touched,
  disabled = false,
  datePickerProps = {},
  customHelperText,
}: CustomDateInputProps) {
  const errorBool = errors && touched;

  return (
    <Box>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker<Date, Date>
          label={label}
          value={!value ? null : value}
          onChange={(newValue) => handleChange(id, newValue)}
          disabled={disabled}
          {...datePickerProps}          
          renderInput={(params) => (
            <TextField
              {...params}
              error={!!errorBool}
              helperText={errorBool ? errors : customHelperText}
              onBlur={handleBlur}
              InputLabelProps={{ sx: { fontSize: "1.6rem" } }}
              onFocus={e => e.target.blur()}
              sx={{
                width: "100%",

                "& .MuiOutlinedInput-root": {
                  height: "5rem",
                  fontSize: "1.6rem",
                },

                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor:
                    errors && touched
                      ? "red !important"
                      : "rgba(0, 0, 0, 0.26)",
                },

                "& .MuiInputLabel-root": {
                  color: errors && touched ? "red" : "rgba(0, 0, 0, 0.38)",
                },
              }}
            />
          )}
        />
      </LocalizationProvider>

      {/* {(errorBool || customHelperText) && (
        <FormHelperText
          sx={{
            typography: "subtitle2",
            padding: ".5rem 0 0 1rem",
            margin: 0,
            color: `${errorBool ? "red" : "black"}`,
          }}
        >
          {errorBool ? errors : customHelperText}
        </FormHelperText>
      )} */}
    </Box>
  );
}

export default React.memo(CustomDateInput);
