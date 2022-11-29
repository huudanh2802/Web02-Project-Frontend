import { Navigate, Route, Routes } from "react-router";
import { NewGroupPage } from "../components/Routes/NewGroupPage/NewGroupPage";
import GroupInfo from "../routes/GroupInfo";
import GroupList from "../routes/GroupList";
import InviteMember from "../routes/InviteMember";
import ManageUser from "../routes/ManageUser";
import GroupRouter from "./GroupRouter";

export default function BaseRouter() {
  return (
    <Routes>
      <Route path="group" element={<GroupRouter />}>
        <Route path="grouplist" element={<GroupList />} />
        <Route path="grouplist/:name" element={<GroupInfo />} />
        <Route path="newgroup" element={<NewGroupPage />} />
        <Route path="invite" element={<InviteMember />} />
        <Route path="manageuser" element={<ManageUser />} />
      </Route>
      <Route path="" element={<Navigate to="/group/grouplist" replace />} />
    </Routes>
  );
}
