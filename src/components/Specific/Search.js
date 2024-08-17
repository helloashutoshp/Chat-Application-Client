import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../Shared/UserItem";
import { sampleUsers } from "../../constants/SampleData";
const Search = () => {
  const [users, setUsers] = useState(sampleUsers);
  const search = useInputValidation();
  const addFriendHandler = () => {
    console.log("hi");
  };
  let isLoadingSendFriendRequest = false;
  return (
    <Dialog open>
      <Stack p={"2rem"} direction={"column"} width={"20rem"}>
        <DialogTitle textAlign={"center"}>FindPeople</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          {users.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
