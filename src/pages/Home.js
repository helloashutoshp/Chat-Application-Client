import React from "react";
import AppLayout from "../components/Layouts/AppLayout";
import { Box, Typography } from "@mui/material";
import { grayColor } from "../constants/color";

const Home = () => {
  return (
    <Box  height={"100%"} overflow={"hidden"}>
      <Typography p={"2rem"} variant="h5" textAlign={"center"}>Select anyone to chat</Typography>
    </Box>
  );
};

export default AppLayout()(Home);
