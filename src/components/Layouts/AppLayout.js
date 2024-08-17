import React from "react";
import Header from "./Header";
import Title from "../Shared/Title";
import { Grid } from "@mui/material";
import ChatList from "../Specific/ChatList";
import { sampleChats } from "../../constants/SampleData";
import { useLocation } from "react-router-dom-v5-compat";
import Profile from "../Specific/Profile";
import { grayColor,blue } from "../../constants/color";

const getQueryParams = (search) => {
  const params = new URLSearchParams(search);
  return {
    chatId: params.get('chatId'),
    
  };
};
const AppLayout = () => (WrappedComponent) => {

  return (props) => {
    const { chatId } = getQueryParams(window.location.search);
    const handleDeleteChat = (e,_id,groupChat) => {
      e.preventDefault();
      console.log("delete chat",_id,groupChat);
    }
    return (
      <>
        <Title />
        <Header />
        <Grid container height={"100vh"} overflow={"hidden"}>
          <Grid
            item
            sm={4}
            md={3}
            sx={{ display: { xs: "none", sm: "block" } }}
            bgcolor={grayColor}
            height={"100%"}
          >
            <ChatList
              chats={sampleChats}
              chatId={chatId}
              handleDeleteChat={handleDeleteChat}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
            <WrappedComponent {...props} />
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
            <Profile/>
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
