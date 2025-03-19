import Box from "@mui/system/Box";

import Button from "../CustomButton";
import Logo from "../Logo";

interface FullPageInfoProps {
  message: string;
  showBtn?: boolean;
  btnText?: string;
  onBtnClick?: () => void;
  rootStyles?: React.CSSProperties;
}

const FullPageInfo: React.FC<FullPageInfoProps> = ({
  message = "",
  showBtn = false,
  btnText = "",
  onBtnClick = null,
  rootStyles = {},
}) => {
  return (
    <Box sx={{ position: "relative", height: "100%", width: "100%", ...rootStyles }}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "2.2rem",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
          <Logo src="/assets/logos/favicon_medlivery.png" />
          <Box sx={{ textAlign: "center" }}>{message.trim()}</Box>
          {showBtn && <Button text={btnText} fn={() => onBtnClick?.()} rootStyles={{ marginTop: "2rem" }} />}
        </Box>
      </Box>
    </Box>
  );
};

export default FullPageInfo;
