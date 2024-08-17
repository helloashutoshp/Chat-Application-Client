import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/SampleData";
import UserItem from "../Shared/UserItem";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatId }) => {
  const addMemberSubmitHandler = () => {
   closeHandler();
  };
  const [member, setMember] = useState(sampleUsers);
  const [selectedMember, setSelectedMember] = useState([]);
  const addFriendHandler = (id) => {
    setSelectedMember((prev) =>
      prev.includes(id)
    ? prev.filter((currentElement) => currentElement !== id)
    : [...prev, id]
  );
};
const closeHandler = () => {
setMember("");
setSelectedMember([]);
};
  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {member.length > 0 ? (
            member.map((i) => (
              <UserItem
                key={i.id}
                user={i}
                handler={addFriendHandler}
                isAdded={selectedMember.includes(i._id)}
              ></UserItem>
            ))
          ) : (
            <Typography textAlign={"center"}>No Friend</Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Button onClick={closeHandler} color="error">
            Cancel
          </Button>
          <Button
            onClick={addMemberSubmitHandler}
            variant="contained"
            disabled={isLoadingAddMember}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
