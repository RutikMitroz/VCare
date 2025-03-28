// import { useLocation } from "react-router-dom";
// import { Box, Container, Tooltip } from "@mui/material";
// import Logo from "../Logo";
// import CustomMenu from "../CustomMenu";

// const Header = () => {
//     const location = useLocation();

//     return (
//         <Box
//             component="header"
//             sx={{
//                 width: "100%",
//                 height: "max-content",
//                 position: "sticky",
//                 top: 0,
//                 backgroundColor: "white",
//                 zIndex: 11,
//                 borderBottom: "1px solid #dcdcdc",
//             }}
//         >
//             <Container
//                 maxWidth="md"
//                 component="nav"
//                 sx={{
//                     height:'4rem',
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                 }}
//             >
//                 {/* Logo */}
//                 <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
//                     <>
//                         {location.pathname === "/" ? (
//                             <Box>
//                                 <Logo
//                                     src="/assets/logos/V_Care_logo.png"
//                                     isLink={true}
//                                     link="/"
//                                 />
//                             </Box>
//                         ) : (
//                             <Tooltip title="Go to home">
//                                 <Box>
//                                     <Logo
//                                         src="/assets/logos/V_Care_logo.png"
//                                         isLink={true}
//                                         link="/"
//                                     />
//                                 </Box>
//                             </Tooltip>
//                         )}
//                     </>
//                 </Box>

//                 {/* Profile Icon */}
//                 <CustomMenu
//                     CustomIconImage={"/assets/logos/user.png"}
//                     iconImageAlt={"/assets/logos/user.png"}
//                     menuStyles={{
//                         marginLeft: "1rem",
//                         width: 35,
//                         height: 35,
//                     }}
//                     items={[
//                         {
//                             itemName: "Profile",
//                             pathname: "/profile",
//                             iconImage: "/assets/icons/profile.png"
//                         },
//                         {
//                             itemName: "Logout",
//                             iconImage: "/assets/icons/logout.png",
//                         },
//                     ]}
//                 />
//             </Container>
//         </Box>
//     );
// };

// export default Header;

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Badge,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Navbar from "../Navbar";

const Header = () => {
  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "white",
          color: "black",
          boxShadow: "0px 0px 0px rgba(0,0,0,0)",
          borderBottom: "1px solid #dcdcdc",
          zIndex: 1100,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            minHeight: "48px !important",
            height: "48px",
            padding: "0 16px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box
              component="img"
              src="/assets/logos/V_Care_logo.png"
              alt="Logo"
              sx={{ height: "32px", width: "auto", cursor: "pointer" }}
            />
            <Box
              sx={{
                height: "20px",
                width: "1px",
                backgroundColor: "#dcdcdc",
              }}
            />
            <Typography
              sx={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#000",
              }}
            >
              Enquiries
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mr: 2 }}>
            <IconButton size="small">
              <Badge badgeContent={1} color="error">
                <NotificationsIcon sx={{ color: "black", fontSize: "20px" }} />
              </Badge>
            </IconButton>
            <Avatar
              alt="User"
              src="/assets/user.png"
              sx={{ width: 28, height: 28, cursor: "pointer" }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Navbar />
    </>
  );
};

export default Header;
