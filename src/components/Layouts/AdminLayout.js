import {
  Close as CloseIcon,
  ExitToApp as ExitToAppIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material";
import React, { useState } from "react";
import { useLocation, Link as LinkComponent,Navigate } from "react-router-dom-v5-compat";
import { adminTabs } from "../../constants/Route";
const Link = styled(LinkComponent)`
    text-decoration:none;
    border-radius:2rem;
    color:black;
    padding:1rem 2rem;
    &:hover {
    color:rgba(0,0,0,0.54);
    }
`;
const logoutHandler = () => {
  console.log("logout");
};
const isAdmin = false
const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();
{if(isAdmin)  return <Navigate to="/admin"/>}
  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h5" textTransform={"uppercase"} sx={{fontWeight:"10rem"}}>
        Alochana
      </Typography>
      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (
          <>
            <Link
              key={tab.path}
              to={tab.path}
              sx={
                location.pathname === tab.path && {
                  bgcolor: "#393e3e",
                  color: "white",
                  ":hover": { color: "white" },
                }
              }
            >
              <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
                {tab.icon}
                <Typography>{tab.name}</Typography>
              </Stack>
            </Link>
          </>
        ))}
        <Link onClick={logoutHandler}>
          <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
            <ExitToAppIcon />
            <Typography>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};
const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const handleMobile = () => {
    setIsMobile(!isMobile);
  };
  const handleClose = () => {
    setIsMobile(false);
  };
  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>
          {isMobile ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <Grid item md={4} lg={3} sx={{ display: { xs: "none", md: "block" } }}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} md={8} lg={9} sx={{ bgcolor: "#f5f5f5" }} >
        {children}
      </Grid>
      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
