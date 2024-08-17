import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import Header from "../components/Layouts/Header";
import {
  Backdrop,
  Box,
  Button,
  Drawer,
  Grid,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { blue } from "../constants/color";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import { matBlack } from "../constants/color";
import { useNavigate, useSearchParams } from "react-router-dom-v5-compat";
import { Link } from "../components/Styles/StyledComponents";
import AvtarCard from "../components/Shared/AvtarCard";
import { sampleChats, sampleUsers } from "../constants/SampleData";
import UserItem from "../components/Shared/UserItem";
const Groups = () => {
  const isAddMember = false;
  const chatId = useSearchParams()[0].get("group");
  const [isMobileOpenMenu, setMobileOpenMenu] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [updatedGroupNameValue, setUpdatedGroupNameValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const ConfirmDelete = lazy(() =>
    import("../components/Dialogs/ConfirmDeleteDialog")
  );
  const AddMemberDialog = lazy(() =>
    import("../components/Dialogs/AddMemberDialog")
  );
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate("/");
  };
  const updateGroupName = () => {
    setIsEdit(false);
    console.log(updatedGroupNameValue);
  };
  const handleMobile = () => {
    setMobileOpenMenu((prev) => !prev);
  };
  const handleMobileClose = () => {
    setMobileOpenMenu(false);
  };
  const removeMemberHandler = (id) => {
    console.log(id);
  };
  useEffect(() => {
    if (chatId) {
      setGroupName(`GroupName${chatId}`);
      setUpdatedGroupNameValue(`GroupName${chatId}`);
    }
    return () => {
      setGroupName("");
      setUpdatedGroupNameValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const openAddMember = () => {};
  const openConfirmDeletehandler = () => {
    setConfirmDeleteDialog(true);
  };
  const closeConfirmDeletehandler = () => {
    setConfirmDeleteDialog(false);
  };
  const deleteHandler = () => {
    console.log("delete");
    setConfirmDeleteDialog(false);
  };
  const Iconbtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1rem",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Tooltip title="Back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: matBlack,
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.7)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );
  const GroupName = (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      spacing={"1rem"}
      alignItems={"center"}
      padding={"3rem"}
      top={"2rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={updatedGroupNameValue}
            onChange={(e) => setUpdatedGroupNameValue(e.target.value)}
          />
          <IconButton onClick={updateGroupName}>
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton onClick={() => setIsEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );
  const ButtonGroup = (
    <Stack
      direction={{
        sm: "row",
        xs: "column-reverse",
      }}
      spacing={"1rem"}
      p={{
        sm: "1rem",
        xs: "0",
        md: "1rem 4rem",
      }}
    >
      <Button
        color="error"
        variant="text"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeletehandler}
      >
        Delete Group
      </Button>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMember}
      >
        Add Member
      </Button>
    </Stack>
  );
  return (
    <>
      <Grid container height={"100vh"}>
        <Grid
          item
          sx={{
            display: { xs: "none", sm: "block" },
            backgroundImage: blue,
          }}
          sm={4}
        >
          <GroupList myGroups={sampleChats} chatId={chatId} />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            alignItems: "center",
            padding: "1rem 3rem",
          }}
        >
          {Iconbtns}
          {groupName && (
            <>
              {GroupName}
              <Typography
                margin={"2rem"}
                alignSelf={"flex-start"}
                variant="body1"
              >
                Members
              </Typography>
              <Stack
                maxWidth={"45rem"}
                width={"100%"}
                boxSizing={"border-box"}
                padding={{
                  sm: "1rem",
                  xs: "0",
                  md: "1rem 4rem",
                }}
                spacing={"2rem"}
                height={"50vh"}
                overflow={"auto"}
              >
                {sampleUsers.map((i) => (
                  <UserItem
                    key={i._id}
                    user={i}
                    isAdded = {false}
                    styling={{
                      boxShadow: "0 0 0.2rem 0.2rem rgba(0,0,0,0.1)",
                      padding: "1rem 1rem",
                      borderRadius: "1rem",
                    }}
                    handler={removeMemberHandler}
                  />
                ))}
              </Stack>
              {ButtonGroup}
            </>
          )}
        </Grid>
        {isAddMember && (
          <Suspense fallback={<Backdrop open />}>
            <AddMemberDialog />
          </Suspense>
        )}
        {confirmDeleteDialog && (
          <Suspense fallback={<Backdrop open />}>
            <ConfirmDelete
              open={openConfirmDeletehandler}
              onClose={closeConfirmDeletehandler}
              deleteHandler={deleteHandler}
            />
          </Suspense>
        )}
        <Drawer
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
          }}
          open={isMobileOpenMenu}
          onClose={handleMobileClose}
        >
          <GroupList myGroups={sampleChats} chatId={chatId} />
        </Drawer>
      </Grid>
    </>
  );
};
const GroupList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w} bgcolor={blue} height="100vh" overflow="auto" >
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      ))
    ) : (
      <Typography textAlign={"center"} padding="1rem">
        no groups
      </Typography>
    )}
  </Stack>
);
const GroupListItem = memo(({ group, chatId }) => {
  const { name, avtar, _id } = group;
  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
      sx={{
        ":hover": {
          bgcolor: "gray",
        },
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AvtarCard avtar={avtar} />
        <Typography color={"white"}>{name}</Typography>
      </Stack>
    </Link>
  );
});
export default Groups;
