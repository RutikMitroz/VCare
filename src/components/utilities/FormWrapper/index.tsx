import { Box, SxProps, Theme } from "@mui/material";

interface FormWrapperProps {
  heading: string;
  children: React.ReactNode;
  rootStyles: SxProps<Theme>;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  heading,
  children,
  rootStyles,
}) => {
  return (
    <Box
      sx={{
        boxShadow: 3,
        width: "40rem",
        padding: "3rem 2rem",
        borderRadius: "1rem",

        "@media (max-width: 500px)": { width: "100% !important" },

        ...rootStyles,
      }}
    >
      <Box sx={{ textAlign: "center", typography: "h3", fontWeight: 600 }}>
        {heading}
      </Box>

      {children}
    </Box>
  );
};

export default FormWrapper;
