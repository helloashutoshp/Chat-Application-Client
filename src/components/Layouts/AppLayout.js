  import React, { useEffect } from "react";
  import Header from "./Header";
  import Title from "../Shared/Title";
  import { Drawer, Grid, Skeleton } from "@mui/material";
  import ChatList from "../Specific/ChatList";
  import { sampleChats } from "../../constants/SampleData";
  import Profile from "../Specific/Profile";
  import { grayColor } from "../../constants/color";
  import { useMyChatsQuery } from "../../redux/api/api";
  import { useDispatch, useSelector } from "react-redux";
  import { setChatId, setIsMobile } from "../../redux/reducers/misc";
  import { useErrors } from "../../hooks/hook";
  import { useSocket } from "../../utils/socket";
  import { useParams } from "react-router-dom-v5-compat";

  // const getQueryParams = (search) => {
  //   const params = new URLSearchParams(search);
  //   return {
  //     chatId: params.get("chatId"),
  //   };
  // };

  const AppLayout = ({ children}) => {
    const params = useParams();
    const chatId = params.chatId; // Retrieve chatId from the params
    // console.log(chatId);
    const dispatch = useDispatch();
    const socket = useSocket();
    const { isMobile } = useSelector((state) => state.misc);
    dispatch(setChatId(chatId));

    const { user } = useSelector((state) => state.auth);
    const { isLoading, data, isError, error, refetch } = useMyChatsQuery("");
    useErrors([{ isError, error }]);

    const handleDeleteChat = (e, _id, groupChat) => {
      e.preventDefault();
    };

    const handleMobileClose = () => dispatch(setIsMobile(false));

    return (
      <>
        <Title />
        <Header />
        {isLoading ? (
          <Skeleton />
        ) : (
          <Drawer open={isMobile} onClose={handleMobileClose}>
            <ChatList
              w="70vw"
              chats={data?.chats}
              chatId={chatId} // Pass chatId to ChatList component as well
              handleDeleteChat={handleDeleteChat}
            />
          </Drawer>
        )}
        <Grid container height={"100vh"} overflow={"hidden"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{ display: { xs: "none", sm: "block" } }}
            bgcolor={grayColor}
            height={"100%"}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <ChatList
                chats={data.chats}
                chatId={chatId} 
                handleDeleteChat={handleDeleteChat}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            {/* Pass chatId as a prop to children */}
           {children}
          </Grid>
          <Grid
            item
            md={4}
            lg={3}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "darkslategray",
            }}
          >
            <Profile user={user} />
          </Grid>
        </Grid>
      </>
    );
  };


  export default AppLayout;
