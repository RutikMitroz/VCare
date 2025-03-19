import React, { ReactNode, CSSProperties } from "react";

import Box from "@mui/material/Box";

import CloseButton from "../CloseButton";

interface ModalWrapperProps {
  handleModalClose: () => void;
  children: ReactNode;
  header?: boolean;
  headerTitle?: string;
  rootStyles?: CSSProperties;
  show_close_btn?: boolean;
  Footer?: React.ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
  handleModalClose,
  children,
  header = false,
  headerTitle = "",
  rootStyles = {},
  show_close_btn = true,
  Footer,
}) => {
  return (
    <Box
      sx={{
        position: "relative",
        minWidth: "45rem",
        backgroundColor: "white",
        padding: header ? 0 : "2rem 1.75rem 2.75rem 1.75rem",
        minHeight: "10rem",
        maxHeight: "90vh",
        borderRadius: ".8rem",
        backfaceVisibility: "hidden",
        boxShadow: 5,
        display: "flex",
        flexDirection: "column",

        ...(!header && {
          overflow: "auto",

          "&::-webkit-scrollbar": { width: "1.75rem !important" },

          "&::-webkit-scrollbar-track": { backgroundColor: "white" },

          "&::-webkit-scrollbar-thumb": {
            border: "4.75px solid rgba(0, 0, 0, 0)",
            backgroundClip: "padding-box",
            borderRadius: "9999px",
            backgroundColor: "#AAAAAA",
          },
        }),

        "@media (max-width: 500px)": { width: "100%", minWidth: 0 },

        ...rootStyles,
      }}
    >
      {header ? (
        <Box
          sx={{
            height: "6rem",
            borderBottom: "1px solid #dcdcdc",
            position: "relative",
            display: "flex",
            alignItems: "center",
            padding: "2rem",
            typography: "body1",
            fontWeight: 600,
          }}
        >
          {headerTitle}
          {show_close_btn && <CloseButton handleClick={handleModalClose} />}
        </Box>
      ) : (
        show_close_btn && <CloseButton handleClick={handleModalClose} />
      )}

      <Box
        sx={{
          padding: "2rem",
          height: Footer ? "calc(100% - 6rem - 7rem)" : "calc(100% - 6rem)",
          overflow: "auto",

          "&::-webkit-scrollbar": { width: "1.75rem !important" },

          "&::-webkit-scrollbar-track": { backgroundColor: "white" },

          "&::-webkit-scrollbar-thumb": {
            border: "4.75px solid rgba(0, 0, 0, 0)",
            backgroundClip: "padding-box",
            borderRadius: "9999px",
            backgroundColor: "#AAAAAA",
          },
        }}
      >
        {children}
      </Box>

      {Footer ? <Box sx={{ height: "7rem", borderTop: "1px solid #dcdcdc", padding: "1rem" }}>{Footer}</Box> : null}
    </Box>
  );
};

export default ModalWrapper;
