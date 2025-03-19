import React from "react";
import clsx from "clsx";

import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";

import showToast from "@medlivery/utils/showToast";
import truncateString from "@medlivery/utils/truncateString";
import roundOffTo2Digits from "@medlivery/utils/roundOffTo2Digits";

// Define the types for the component props
interface FileUploadInputProps {
  id: string;
  value: File | string | null;
  handleChange: (id: string, file: File) => void;
  accept: string;
  extension: string;
  allowedSizeInKB?: number;
  placeholder: string;
  placeholderWhenExists: string;
  customClassname?: string;
  options?: {
    disabled?: boolean;
    errors?: string;
    touched?: boolean;
    customHelperText?: string;
    customHelperTextWhenExists?: string;
  };
}

const FileUploadInput: React.FC<FileUploadInputProps> = ({
  id,
  value,
  handleChange,
  accept,
  allowedSizeInKB = 1000,
  placeholder,
  placeholderWhenExists,
  customClassname,
  options = {},
  extension,
}) => {
  const {
    disabled,
    errors,
    touched,
    customHelperText = "",
    customHelperTextWhenExists = "",
  } = options;
  const errorBool = !!(errors && touched);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const chooseFile = () => inputRef.current?.click();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const sizeInKB = file.size / 1000;

    if (sizeInKB > allowedSizeInKB) {
      return showToast(
        `Maximum file size allowed is ${allowedSizeInKB / 1000} MB`,
        "error"
      );
    }

    const acceptArr = accept.replace(/\s/g, "").split(",");
    const extensionArr = extension.replace(/\s/g, "").split(",");

    if (!acceptArr.includes(file.type)) {
      return showToast("Please check the allowed file type", "error");
    } else if (!extensionArr.includes(file.type.split("/")[1])) {
      return showToast("Please check the allowed file type", "error");
    }

    handleChange(id, file);
  };

  const getFilename = (
    value: File | string | null,
    placeholderWhenExists: string
  ) => {
    if (!value) return placeholder;
    if (typeof value === "string") return placeholderWhenExists;
    return `${truncateString(value.name, 40)} (${roundOffTo2Digits(value.size / 1000 + Number.EPSILON)} KB)`;
  };

  return (
    <Box>
      <Box sx={{ position: "relative" }} className={clsx(customClassname)}>
        <Box
          component="input"
          type="file"
          id={id}
          accept={accept}
          onChange={handleFileSelect}
          sx={{ display: "none" }}
          ref={inputRef}
          disabled={disabled}
        />

        <Box
          component="input"
          type="text"
          value={getFilename(value, placeholderWhenExists)}
          sx={{
            height: "5rem",
            width: "100%",
            borderRadius: ".5rem",
            outline: "none",
            border: errorBool ? "1px solid red" : "1px solid #A8A8A8",
            padding: "1rem",
            overflow: "hidden",
            fontSize: "16px",
            paddingRight: "13rem",
            "&::placeholder": {
              fontSize: 15,
              color: errorBool ? "red" : "inherit",
            },
          }}
          placeholder={placeholder}
          disabled
        />

        {value && typeof value === "string" && (
          <Box
            component="a"
            href={value}
            target="_blank"
            sx={{
              position: "absolute",
              right: "12rem",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "1.6rem",
              height: "100%",
              width: "12rem",
              border: "none",
              outline: "none",
              color: "white",
              backgroundColor: errorBool ? "red" : "custom.blue_4",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            View file
          </Box>
        )}

        <Box
          component="button"
          disabled={disabled}
          sx={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "1.6rem",
            height: "100%",
            width: "12rem",
            border: "none",
            outline: "none",
            borderRadius: "0 .5rem .5rem 0",
            color: "white",
            backgroundColor: errorBool ? "red" : "#3f51b5",
            cursor: "pointer",
          }}
          type="button"
          onClick={chooseFile}
        >
          {typeof value === "string" && value.length ? "Reupload" : "Choose"}
        </Box>
      </Box>

      <FormHelperText
        sx={{
          typography: "subtitle3",
          padding: 0,
          marginTop: "3px",
          marginRight: "14px",
          marginBottom: "0",
          marginLeft: "14px",
          color: errorBool ? "red" : "#7F7F7F",
        }}
      >
        {errors && touched
          ? errors
          : value && typeof value === "string"
            ? customHelperTextWhenExists
            : customHelperText}
      </FormHelperText>
    </Box>
  );
};

export default React.memo(FileUploadInput);
