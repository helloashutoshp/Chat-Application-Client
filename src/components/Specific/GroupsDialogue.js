import React, { useState } from "react";
import {
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  ListItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { sampleUsers } from "../../constants/SampleData";
import UserItem from "../Shared/UserItem";
import { useInputValidation } from "6pp";

const GroupsDialogue = () => {
  const closeHandler = () => {};
  const groupName = useInputValidation("");
  const [member, setMember] = useState(sampleUsers);
  const [selectedMember, setSelectedMember] = useState([]);
  const addFriendHandler = (id) => {
    setSelectedMember((prev) =>
      prev.includes(id)
        ? prev.filter((currentElement) => currentElement !== id)
        : [...prev, id]
    );
  };
  const submitHandler = () => {};
  return (
    <Dialog open onClose={closeHandler}>
      <Stack
        p={{ xs: "1rem", sm: "2rem" }}
        direction={"column"}
        width={"20rem"}
        spacing={"2rem"}
      >
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>
        <TextField
          label="Group Name"
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant="body1">Members</Typography>
        <Stack>
          {member.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={addFriendHandler}
              isAdded={selectedMember.includes(user._id)}
            />
          ))}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button color="error" variant="text">
            Cancel
          </Button>
          <Button variant="contained" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default GroupsDialogue;
