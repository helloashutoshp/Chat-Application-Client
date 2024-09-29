import React, { Suspense, lazy, startTransition, useState } from "react";
import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Group as GroupIcon,
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom-v5-compat";
import { blue } from "../../constants/color";
import axios from "axios";
import { server } from "../../constants/config";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "../../redux/reducers/auth";
import { setIsMobile, setIsNotification, setIsSearch } from "../../redux/reducers/misc";

const Header = () => {
  const navigate = useNavigate();

  const {isSearch,isNotification} = useSelector((state) => state.misc);

  // const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  // const [isNotification, setIsNotification] = useState(false);
  const Search = lazy(() => import("../Specific/Search"));
  const NotificationDialog = lazy(() => import("../Specific/Notifications"));
  const GroupDialog = lazy(() => import("../Specific/GroupsDialogue"));
  const dispatch = useDispatch();

  const handleMobile = () => {
    dispatch(setIsMobile(true));
  };

  const openSearch = () => {
    dispatch(setIsSearch(true));
  };

  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };

  const openNotifications = () => {
    dispatch(setIsNotification(true));
  };

  const navigateGroup = () => {
    startTransition(() => {
      navigate("/groups");
    });
  };


  const logoutHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(userNotExists());
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static" sx={{ bgcolor: blue }}>
          <Toolbar>
            <Typography
              variant="h5"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              Alochana
            </Typography>
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn
                title={"Search"}
                onClick={openSearch}
                icon={<SearchIcon />}
              />
              <IconBtn
                title={"New Group"}
                onClick={openNewGroup}
                icon={<AddIcon />}
              />
              <IconBtn
                title={"Manage Groups"}
                onClick={navigateGroup}
                icon={<GroupIcon />}
              />
              <IconBtn
                title={"Notifications"}
                onClick={openNotifications}
                icon={<NotificationsIcon />}
              />
              <IconBtn
                title={"Logout"}
                onClick={logoutHandler}
                icon={<LogoutIcon />}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {isSearch && (
        <Suspense fallback={<Backdrop open />}>
          <Search />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open />}>
          <NotificationDialog />
        </Suspense>
      )}{" "}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open />}>
          <GroupDialog />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, onClick, icon }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
