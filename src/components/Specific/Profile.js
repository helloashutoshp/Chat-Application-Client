import { Avatar, Stack, Typography } from "@mui/material";
import React from "react";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import  moment  from "moment";
const Profile = () => {
  return (
    <div>
      <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
        <Avatar
          sx={{
            width: 150,
            height: 150,
            objectFit: "contain",
            marginBottom: "1rem",
            border: "5ox solid white",
          }}
        />
        <ProfileCard heading={"Bio"} text={"See you boy"} />
        <ProfileCard
          heading={"Username"}
          text={"hellouser"}
          Icon={<UserNameIcon />}
        />
        <ProfileCard
          heading={"Name"}
          text={"Ashutosh Pradhan"}
          Icon={<FaceIcon />}
        />
        <ProfileCard
          heading={"Joined"}
          text={moment('2024-01-01T00:00:02.007Z').fromNow()} 
          Icon={<CalendarIcon />}
        />
      </Stack>
    </div>
  );
};

const ProfileCard = ({ text, Icon, heading }) => (
  <Stack
    direction={"row"}
    alignItems={"center"}
    spacing={"1rem"}
    color={"white"}
    textAlign={"center"}
  >
    {Icon && Icon }
    <Stack>
      <Typography variant="body1">{text}</Typography>
      <Typography variant="caption" color={"darkgray"}>
        {heading}
      </Typography>
    </Stack>
  </Stack>
);

export default Profile;
