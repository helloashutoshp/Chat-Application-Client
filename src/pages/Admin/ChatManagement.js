import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Layouts/AdminLayout";
import Table from "../../components/Shared/Table";
import { Avatar, Stack } from "@mui/material";
import { dashboardData } from "../../constants/SampleData";
// import { Avtarcard } from "../../components/Shared/AvtarCard";
import AvtarCard from "../../components/Shared/AvtarCard";
import { transFormImage } from "../../lib/Feature";
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: "200",
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: "200",
  },

  {
    field: "members",
    headerName: "Members",
    headerClassName: "table-header",
    width: "200",
    renderCell: (params) => <AvtarCard avtar={params.row.members} />,
  },
  {
    field: "totalMembers",
    headerName: "TotalMember",
    headerClassName: "table-header",
    width: "200",
  },

  {
    field: "avtar",
    headerName: "Avtar",
    headerClassName: "table-header",
    width: "200",
    renderCell: (params) => <AvtarCard avtar={params.row.avtar} />,
  },
  {
    field: "totalMessages",
    headerName: "TotalMessages",
    headerClassName: "table-header",
    width: "200",
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: "200",
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avtar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];
const ChatManagement = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      dashboardData.chats.map((i) => ({
        ...i,
        id: i._id,
        members: i.members.map((i) => transFormImage(i.avtar, 50)),
      }))
    );
  }, []);
  return (
    <AdminLayout>
      <Table heading={"All Chats"} rows={rows} columns={columns} />
    </AdminLayout>
  );
};

export default ChatManagement;
