import { Navigate, Route, Routes } from "react-router";
import ManageGroupPage from "../components/Page/ManageGroupPage/ManageGroupPage";
import { NewGroupPage } from "../components/Page/NewGroupPage/NewGroupPage";
import GroupInfo from "../components/Page/DetailGroupPage/GroupInfo/GroupInfo";
import ManageUser from "../routes/ManageUser";
import GroupRouter from "./GroupRouter";

export default function BaseRouter() {
  return (
    <Routes>
      <Route path="group" element={<GroupRouter />}>
        <Route path="grouplist" element={<ManageGroupPage />} />
        <Route path="detail/:id" element={<GroupInfo />} />
        <Route path="newgroup" element={<NewGroupPage />} />
        <Route path="manageuser" element={<ManageUser />} />
      </Route>
      <Route path="" element={<Navigate to="/group/grouplist" replace />} />
    </Routes>
  );
}
