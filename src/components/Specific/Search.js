import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import UserItem from "../Shared/UserItem";
import { sampleUsers } from "../../constants/SampleData";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducers/misc";
import {
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
} from "../../redux/api/api";
import { toast } from "react-hot-toast";
import { useAsyncMutation } from "../../hooks/hook";
const Search = () => {
  const [users, setUsers] = useState([]);
  const search = useInputValidation();

  const dispatch = useDispatch();
  const [searchUser] = useLazySearchUserQuery();
  const [sendFrndRequest,isLoadingSendFriendRequest] = useAsyncMutation(useSendFriendRequestMutation);
  const { isSearch } = useSelector((state) => state.misc);
  const handleSearchClose = () => {
    dispatch(setIsSearch(false));
  };
  const addFriendHandler = async (id) => {
  await sendFrndRequest("Sending friend request",{userId:id});
  };
  // let isLoadingSendFriendRequest = false;
  useEffect(() => {
    const timeOut = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => setUsers(data.users))
        .catch((e) => console.log(e));
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [search.value]);
  return (
    <Dialog open={isSearch} onClose={handleSearchClose}>
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
