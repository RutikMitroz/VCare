import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SxProps, Theme } from "@mui/material/styles";

interface CloseButtonProps {
  handleClick: () => void;
  rootStyles?: SxProps<Theme>;
}

const CloseButton: React.FC<CloseButtonProps> = ({
  handleClick,
  rootStyles = {},
}) => {
  return (
    <IconButton
      sx={{
        position: "absolute",
        right: "10px",
        top: "10px",
        zIndex: 100,

        "&:hover": { color: "red" },

        ...rootStyles, // Spread rootStyles here to override any default styles
      }}
      onClick={handleClick}
    >
      <CloseIcon />
    </IconButton>
  );
};

export default CloseButton;
