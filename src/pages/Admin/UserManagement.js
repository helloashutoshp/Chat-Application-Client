import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/Layouts/AdminLayout";
import Table from "../../components/Shared/Table";
import { Avatar } from "@mui/material";
import { dashboardData } from "../../constants/SampleData";
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
    field: "email",
    headerName: "Email",
    headerClassName: "table-header",
    width: "200",
  },
  {
    field: "username",
    headerName: "UserName",
    headerClassName: "table-header",
    width: "200",
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: "200",
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: "200",
  },
  {
    field: "avtar",
    headerName: "Avtar",
    headerClassName: "table-header",
    width: "200",
    renderCell: (params) => 
      <Avatar alt={params.row.name} src={params.row.avtar} />
    
  },
];
const UserManagement = () => {
  const [rows, setRows] = useState([]);
  useEffect(()=>{
    setRows(dashboardData.users.map((i)=>({...i,id:i._id})))
  },[]);
  return (
    <AdminLayout>
      <Table heading={"All Users"} rows={rows} columns={columns} />
    </AdminLayout>
  );
};

export default UserManagement;
