import React, { useRef, useState } from "react";
import AppLayout from "../components/Layouts/AppLayout";
import { IconButton, Stack } from "@mui/material";
import { blue, grayColor } from "../constants/color";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../components/Styles/StyledComponents";
import FileMenu from "../components/Dialogs/FileMenu";
import MessageComponent from "../components/Shared/MessageComponent";
import { sampleMessage } from "../constants/SampleData";
const Chat = () => {
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
      <form style={{ height: "10%" }}>
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
          <InputBox placeholder="Type Message......" />
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
