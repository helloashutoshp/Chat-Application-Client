import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { sampleNotifications } from "../../constants/SampleData";
import {
  useAcceptFriendRequestMutation,
  useGetNotificationQuery,
} from "../../redux/api/api";
import { useErrors } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsNotification } from "../../redux/reducers/misc";
import toast from "react-hot-toast";
const Notifications = () => {
  const { isLoading, data, error, isError } = useGetNotificationQuery();
  // console.log("data ia ", data);

  useErrors([{ error, isError }]);
  const [acceptFrndRequest] = useAcceptFriendRequestMutation();
  const friendRequestHandler = async ({ _id, accept }) => {
    dispatch(setIsNotification(false));
    try {
      const res = await acceptFrndRequest({ requestId: _id, accept });
      console.log("response is ",res);
      if (res.data?.success == 1) {
        console.log("sub response is",res.data.message);
        toast.success(res.data?.message);
      } else {
        console.log("sub error is",res.data.error);
        toast.error(res.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Something went wrong2");
      console.log("main error is",error);
    }
  };
  const dispatch = useDispatch();
  const closeNotificationHandler = () => {
    dispatch(setIsNotification(false));
  };
  const { isNotification } = useSelector((state) => state.misc);
  return (
    <Dialog open={isNotification} onClose={closeNotificationHandler}>
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        direction={"column"}
        maxWidth={"25rem"}
      >
        <DialogTitle>Notifications</DialogTitle>
        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            {data.allRequest?.length > 0 ? (
              data.allRequest?.map(({ sender, _id }) => (
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
          </>
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
        <Avatar src={avtar} />
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
          <Button
            color="success"
            onClick={() => handler({ _id, accept: true })}
          >
            Accept
          </Button>
          <Button color="error" onClick={() => handler({ _id, accept: false })}>
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});
export default Notifications;
