import React from "react";
import { Navigate,Outlet } from "react-router-dom-v5-compat";

//-- user - false , '' , null , undefined 
const ProtectRoute = ({ children, user, redirect = "/login" }) => {
  if (!user) return <Navigate to={redirect} />;
  return children ? children : <Outlet/>;
};

export default ProtectRoute;
