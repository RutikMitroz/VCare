import { Box, Grid, SxProps, Theme } from "@mui/material";
import CustomButtonAdv from "../CustomButton";

interface FormWrapperProps {
  heading: string;
  children: React.ReactNode;
  isSubmitting: boolean;
  buttonText?: string;
  rootStyles?: SxProps<Theme>;
  onSubmit: () => void;
  options?: {
    removeBoxShadow?: boolean;
  };
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  heading,
  children,
  isSubmitting,
  buttonText,
  rootStyles,
  options,
  onSubmit,
}) => {
  return (
    <Grid
      container
      rowSpacing={2}
      component="form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      sx={{
        ...(options?.removeBoxShadow
          ? { border: "1px solid #dcdcdc" }
          : { boxShadow: 3 }),

        width: "40rem",
        padding: "3rem 2rem",
        borderRadius: "1rem",

        "@media (max-width: 500px)": { width: "100% !important" },

        ...rootStyles,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          width: "100%",
          typography: "h3",
          fontWeight: 600,
          marginBottom: "1.5rem",
        }}
      >
        {heading}
      </Box>

      {children}

      <Grid
        item
        xs={12}
        sm={12}
        sx={{ textAlign: "center", marginTop: "1rem" }}
      >
        <CustomButtonAdv
          type="submit"
          text={buttonText ?? "Create"}
          loading={isSubmitting}
          disabled={isSubmitting}
          rootStyles={{ width: "100%", borderRadius: ".5rem" }}
        />
      </Grid>
    </Grid>
  );
};

export default FormWrapper;
