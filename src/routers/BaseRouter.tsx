import { Navigate, Route, Routes } from "react-router";
import ManageGroupPage from "../components/Page/ManageGroupPage/ManageGroupPage";
import { NewGroupPage } from "../components/Page/NewGroupPage/NewGroupPage";
import ManageUser from "../routes/ManageUser";
import GroupRouter from "./GroupRouter";
import Login from "../components/Page/Authentication/Login";
import Signup from "../components/Page/Authentication/Signup";
import Verification from "../components/Page/Authentication/Verification";
import Confirm from "../components/Page/Authentication/Confirm";
import DetailGroupInfo from "../components/Page/DetailGroupPage/DetailGroupInfo/DetailGroupInfo";
import AutoJoin from "../components/Page/AutoJoin/AutoJoin";

export default function BaseRouter() {
  const isLoggedIn = localStorage.getItem("email") !== null;

  return (
    <Routes>
      <Route path="group" element={<GroupRouter />}>
        <Route path="grouplist" element={<ManageGroupPage />} />
        <Route path="detail/:id" element={<DetailGroupInfo />} />
        <Route path="newgroup" element={<NewGroupPage />} />
        <Route path="manageuser" element={<ManageUser />} />
        <Route path="autojoin/:groupId" element={<AutoJoin />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/confirm/:token" element={<Confirm />} />
      {isLoggedIn && (
        <Route path="" element={<Navigate to="/group/grouplist" replace />} />
      )}
      {!isLoggedIn && (
        <Route path="" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}
