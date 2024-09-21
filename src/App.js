import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom-v5-compat";
import ProtectRoute from "./components/Auth/ProtectRoute";
import { Loaderlayout } from "./components/Layouts/Loader";
import { server } from "./constants/config.js";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { userNotExists } from "./redux/reducers/auth.js";
import { Toaster } from "react-hot-toast";
// import dotenv from "dotenv";

// import Home from "./pages/Home";
const Home = lazy(() => import("./pages/Home"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const Login = lazy(() => import("./pages/Logedin"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Admin_login = lazy(() => import("./pages/Admin/Admin_login"));
const Dashboard = lazy(() => import("./pages/Admin/Dashboard"));
const ChatManage = lazy(() => import("./pages/Admin/ChatManagement"));
const UserManage = lazy(() => import("./pages/Admin/UserManagement"));
const MsgManage = lazy(() => import("./pages/Admin/MsgManagement"));
// dotenv.config({
//   path: "./.env",
// });

const App = () => {
  const { user, loader } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/profile`)
      .then((res) => console.log(res))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch]);
  return loader ? (
    <Loaderlayout />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<Loaderlayout />}>
        <Routes>
          <Route element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>
          <Route
            path="/login"
            element={
              <ProtectRoute user={!user} redirect={"/"}>
                <Login />
              </ProtectRoute>
            }
          />
          <Route path="/admin" element={<Admin_login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/user" element={<UserManage />} />
          <Route path="/admin/chats" element={<ChatManage />} />
          <Route path="/admin/message" element={<MsgManage />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center"/>
    </BrowserRouter>
  );
};

export default App;
