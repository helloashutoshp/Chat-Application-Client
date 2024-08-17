import React from "react";
import AdminLayout from "../../components/Layouts/AdminLayout";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import {
  AdminPanelSettings as AdminPanelSettingsIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import moment from "moment";
import {
  CurveButton,
  SearchField,
} from "../../components/Styles/StyledComponents";
import { DougnotChart, LineCharts } from "../../components/Specific/Charts";

const Dashboard = () => {
  const Appbar = (
    <Paper
      elevation={3}
      sx={{ padding: "2rem", margin: "2rem 0", borderRadius: "1rem" }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{ fontSize: "3rem" }} />
        <SearchField />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography
          sx={{
            display: {
              xs: "none",
              lg: "block",
            },
          }}
        >
          {moment().format("dddd, D MMMM YYYY")}
        </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  );

  const widgets = (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing="2rem"
      justifyContent="space-between"
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"Users"} value={5} icon={<PersonIcon />} />
      <Widget title={"Chats"} value={10} icon={<GroupIcon />} />
      <Widget title={"Messages"} value={50} icon={<MessageIcon />} />
    </Stack>
  );
  return (
    <AdminLayout>
      <Container component={"main"}>
        {Appbar}
        <Stack
          direction={{ xs: "column", lg: "row" }}
          spacing={"2rem"}
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={{
            sm: "center",
            lg: "stretch",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
              flex: 1,
            }}
            direction={{
              sm: "column",
              lg: "row",
            }}
          >
            <Typography variant="h4" margin={"2rem 0"}>
              Last Message
            </Typography>
            <LineCharts value={[1, 22, 44, 15, 10, 25, 50]} />
          </Paper>
          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              width: { xs: "100%", sm: "50%" },
              width: "100%",
              maxWidth: "25rem",
            }}
          >
            <DougnotChart value={[15, 22]} labels={["Users", "Groups"]} />
            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <GroupIcon />
              <Typography>Vs</Typography>
              <PersonIcon />
            </Stack>
          </Paper>
        </Stack>
        {widgets}
      </Container>
    </AdminLayout>
  );
};
const Widget = ({ title, value, icon }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1rem",
        width: "20rem",
      }}
    >
      <Stack alignItems={"center"} spacing={"1rem"}>
        <Typography
          sx={{
            color: "rgba(0,0,0,0.7)",
            borderRadius: "50%",
            width: "5rem",
            height: "5rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "5px solid rgba(0,0,0,0.9)",
          }}
        >
          {value}
        </Typography>
        <Stack direction={"row"} spacing={"1rem"}>
          {icon}
          <Typography>{title}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};
export default Dashboard;
