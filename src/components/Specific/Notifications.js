import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  Typography
} from "@mui/material";
import React, { memo } from "react";
import { sampleNotifications } from "../../constants/SampleData";
const Notifications = () => {
  const friendRequestHandler = ({_id, accept}) => {};
  return (
    <Dialog open>
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        direction={"column"}
        maxWidth={"25rem"}
      >
        <DialogTitle>Notifications</DialogTitle>
        {sampleNotifications.length > 0 ? (
          sampleNotifications.map(({sender, _id}) => (
            <Notification
              sender={sender}
              _id={_id}
              key={_id}
              handler={friendRequestHandler}
            />
          ))
        ) : (
          <Typography textAlign={"center"}>Empty</Typography>
        )}
      </Stack>
    </Dialog>
  );
};
const Notification = memo(({ sender, _id, handler }) => {
  const { name, avtar } = sender;
  // console.log(sender.name);
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
      >
        <Avatar src={avtar}/>
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {`${name} sent you a friend request`}
        </Typography>
        <Stack
          direction={{
            sx: "column",
            sm: "column",
          }}
        >
          <Button color="success" onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});
export default Notifications;
