import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { IconButton, Stack } from "@mui/material";
import React, { useRef, useState } from "react";
import FileMenu from "../components/Dialogs/FileMenu";
import AppLayout from "../components/Layouts/AppLayout";
import MessageComponent from "../components/Shared/MessageComponent";
import { InputBox } from "../components/Styles/StyledComponents";
import { blue } from "../constants/color";
import { sampleMessage } from "../constants/SampleData";
import { useSocket } from "../utils/socket";
import { NEW_MESSAGE } from "../constants/event";
import { useSelector } from "react-redux";
const Chat = ({members}) => {
  const { chatId } = useSelector((state) => state.misc);
  // console.log(chatId);
  const user = {
    _id: "user_id_2",
    name: "jdndfmnkn",
  };
  const containerRef = useRef(null);
  const fileMenuRef = useRef(null);
  const [fileMenuOpen, setFileMenuOpen] = useState(false);
  const handleFileOpenMenu = () => {
    setFileMenuOpen(true);
  };
  const handleFileCloseMenu = () => {
    setFileMenuOpen(false);
  };
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if(!message.trim()) return ;
    socket.emit(NEW_MESSAGE,{chatId,members,message});
    setMessage("");
  };
  return (
    <AppLayout>
      <>
        <Stack
          ref={containerRef}
          boxSizing={"border-box"}
          padding={"1rem"}
          spacing={"1rem"}
          height={"85%"}
          sx={{
            overflowX: "hidden",
            overflowY: "hidden",
          }}
        >
          {sampleMessage.map((i) => (
            <MessageComponent key={i._id} message={i} user={user} />
          ))}
        </Stack>
        <form style={{ height: "10%" }} onSubmit={submitHandler}>
          <Stack
            direction={"row"}
            height={"100%"}
            padding={"1rem"}
            alignItems={"center"}
            position={"relative"}
          >
            <IconButton
              sx={{
                position: "absolute",
                left: "1.5rem",
              }}
              ref={fileMenuRef}
              onClick={handleFileOpenMenu}
            >
              <AttachFileIcon />
            </IconButton>
            <InputBox
              placeholder="Type Message......"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <IconButton
              type="submit"
              sx={{
                bgcolor: blue,
                color: "white",
                marginLeft: "1rem",
                padding: "0.5rem",

                "&:hover": {
                  bgcolor: "black",
                },
              }}
            >
              <SendIcon />
            </IconButton>
          </Stack>
        </form>
        {fileMenuRef.current && (
          <FileMenu
            anchorE1={fileMenuRef.current}
            open={fileMenuOpen}
            close={handleFileCloseMenu}
          />
        )}
      </>
    </AppLayout>
  );
};

export default Chat;
