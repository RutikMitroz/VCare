import { useState } from "react";

import Box from "@mui/material/Box";
import { Dialog } from "@mui/material";

import CloseButton from "../CloseButton";
import CustomButtonAdv from "../CustomButton";

interface CustomDialogProps {
  openDialog: boolean;
  handleDialogClose: () => void;
  heading?: string;
  description?: string;
  btnText1?: string;
  btnText2?: string;
  whenConfirmCB?: () => Promise<void> | void;
  flipBtns?: boolean;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  openDialog,
  handleDialogClose,
  heading = "Heading",
  description = "Write a description",
  btnText1 = "Cancel",
  btnText2 = "Delete",
  whenConfirmCB,
  flipBtns = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog open={openDialog}>
      <Box
        sx={{
          backgroundColor: "white",
          minWidth: "45rem",
          maxWidth: "50rem",
          minHeight: "15rem",
          borderRadius: ".8rem",
          backfaceVisibility: "hidden",
          boxShadow: 5,
          position: "relative",
          padding: "1.5rem 1.75rem 2rem 1.75rem",
          "@media (max-width: 500px)": { width: "100%", minWidth: "100%" },
        }}
      >
        <CloseButton
          handleClick={handleDialogClose}
          rootStyles={{ "@media (max-width: 500px)": { display: "none" } }}
        />

        <Box sx={{ typography: "body1" }}>{heading}</Box>

        <Box sx={{ typography: "subtitle2", marginTop: "1.5rem" }}>
          {description}
        </Box>

        <Box
          sx={{
            marginTop: "1.75rem",
            display: "flex",
            justifyContent: flipBtns === true ? "flex-start" : "flex-end",
            gap: ".75rem",
            flexDirection: flipBtns === true ? "row-reverse" : "row",
          }}
        >
          <CustomButtonAdv
            text={btnText1}
            enableIcon={false}
            buttonStyles={{ minWidth: "9rem", height: "38px" }}
            rootStyles={{ borderRadius: ".5rem" }}
            onClick={handleDialogClose}
            disabled={isLoading}
          />

          <CustomButtonAdv
            text={btnText2}
            enableIcon={false}
            buttonStyles={{ minWidth: "9rem", height: "38px" }}
            rootStyles={{ borderRadius: ".5rem" }}
            variant="outlined"
            loading={isLoading}
            onClick={async () => {
              if (whenConfirmCB) {
                try {
                  setIsLoading(true);
                  await whenConfirmCB();
                } catch (err) {
                  // Handle error here if needed
                } finally {
                  setIsLoading(false);
                  handleDialogClose();
                }
              }
            }}
          />
        </Box>
      </Box>
    </Dialog>
  );
};

export default CustomDialog;
