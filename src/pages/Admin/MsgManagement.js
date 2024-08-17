import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Layouts/AdminLayout";
import Table from "../../components/Shared/Table";
import { Avatar, Box, Stack } from "@mui/material";
import { dashboardData } from "../../constants/SampleData";
// import { Avtarcard } from "../../components/Shared/AvtarCard";
import AvtarCard from "../../components/Shared/AvtarCard";
import { fileFormat, transFormImage } from "../../lib/Feature";
import moment from "moment";
import RenderAttachment  from "../../components/Shared/RenderAttachment";
const MsgManagement = () => {
  const columns = [
    {
      field: "id",
      headerName: "ID",
      headerClassName: "table-header",
      width: "200",
    },
    {
      field: "content",
      headerName: "Content",
      headerClassName: "table-header",
      width: "200",
    },
    {
      field: "attachments",
      headerName: "Attachments",
      headerClassName: "table-header",
      width: "200",
      renderCell: (params) => {
        const {attachments} = params.row;
        return attachments?.length > 0
          ? attachments.map((i) => {
              const url = i.url;
              const file = fileFormat(url);
              return (
                <Box>
                  <a
                    href={url}
                    download
                    target="_blank"
                    style={{
                      color: "black",
                    }}
                    className="hr"
                  >
                    {RenderAttachment(file,url)}
                  </a>
                </Box>
              );
            })
          : "No Attachments";
        // <Avatar alt={params.row.name} src={params.row.attachments[0].url } />
      },
    },
    {
      field: "sender",
      headerName: "Send By",
      headerClassName: "table-header",
      width: "200",
      renderCell: (params) => (
        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
          <Avatar alt={params.row.sender.name} src={params.row.sender.avtar} />
          <span>{params.row.sender.name}</span>
        </Stack>
      ),
    },
    {
      field: "chat",
      headerName: "Chats",
      headerClassName: "table-header",
      width: "200",
    },
    {
      field: "groupChat",
      headerName: "GroupChat",
      headerClassName: "table-header",
      width: "200",
      renderCell: (params) => (
        params.row.groupChats?<span>{params.row.groupChats}</span>:<span>No GroupChats</span>
      ),
    },
    {
      field: "createdAt",
      headerName: "Time",
      headerClassName: "table-header",
      width: "200",
    },
  ];
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      dashboardData.messages.map((i) => ({
        ...i,
        id: i._id,
        createdAt: moment(i.createdAt).format("MMMM Do YYYY,h:mm:ss a"),
      }))
    );
  }, []);
  return (
    <AdminLayout>
      <Table heading={"All Messages"} rows={rows} columns={columns} rowHeight={200} />
    </AdminLayout>
  );
};

export default MsgManagement;
