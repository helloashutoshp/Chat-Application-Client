import React from "react";
import AppLayout from "../components/Layouts/AppLayout";
import { Box, Typography } from "@mui/material";

const Home = () => {
  // console.log(homee);
  return (
    <AppLayout>
      <Box height={"100%"} overflow={"hidden"}>
        <Typography p={"2rem"} variant="h5" textAlign={"center"}>
          Select anyone to chat
        </Typography>
      </Box>
    </AppLayout>
  );
};

export default Home;
