import { Navigate, Route, Routes } from "react-router";
import ManageGroupPage from "../components/Page/ManageGroupPage/ManageGroupPage";
import { NewGroupPage } from "../components/Page/NewGroupPage/NewGroupPage";
import GroupInfo from "../components/Page/DetailGroupPage/GroupInfo/GroupInfo";
import ManageUser from "../routes/ManageUser";
import GroupRouter from "./GroupRouter";
import Login from "../authentication/Login";
import Signup from "../authentication/Signup";
import Verification from "../authentication/Verification";
import Confirm from "../authentication/Confirm";

export default function BaseRouter() {
  return (
    <Routes>
      <Route path="group" element={<GroupRouter />}>
        <Route path="grouplist" element={<ManageGroupPage />} />
        <Route path="detail/:id" element={<GroupInfo />} />
        <Route path="newgroup" element={<NewGroupPage />} />
        <Route path="manageuser" element={<ManageUser />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/confirm/:token" element={<Confirm />} />
      <Route path="" element={<Navigate to="/group/grouplist" replace />} />
    </Routes>
  );
}
