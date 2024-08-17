import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import { Avatar, IconButton, ListItem, Stack, Typography } from "@mui/material";
import React from "react";
const UserItem = ({ user, handler, handlerIsLoading,isAdded,styling = {} }) => {
  const { name, _id, avtar } = user;
  // console.log(avtar);
  return (
    <ListItem>
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={"1rem"}
        width={"100%"}
        {...styling}
      >
        <Avatar />
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
          {name}
        </Typography>
        <IconButton
          size="small"
          sx={{
            bgcolor:isAdded?"error.main":"primary.main",
            color: "white",
            "&:hover": {
              bgcolor: isAdded?"error.main":"primary.main",
            },
          }}
          onClick={() => handler(_id)}
          disabled={handlerIsLoading}
        >
          {isAdded ? <RemoveIcon/> : <AddIcon />}
          
        </IconButton>
      </Stack>
    </ListItem>
  );
};

export default UserItem;
