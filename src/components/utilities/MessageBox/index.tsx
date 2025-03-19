import React from "react";
import { Box, SxProps } from "@mui/material";

interface MessageBoxProps extends React.ComponentPropsWithoutRef<"div"> {
  message: string;
  rootStyles?: SxProps;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, rootStyles, ...otherProps }) => {
  return (
    <Box
      sx={{
        typography: "subtitle1",
        color: "custom.grey_2",
        textAlign: "center",
        cursor: otherProps.onClick ? "pointer" : "default",

        "&:hover": {
          color: otherProps.onClick ? "custom.light" : "custom.grey_2",
        },

        ...rootStyles,
      }}
      {...otherProps}
    >
      {message}
    </Box>
  );
};

export default MessageBox;
