/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Menu from "../components/Menu/Menu";
import { NewGroupPage } from "../components/Routes/NewGroupPage/NewGroupPage";
import GroupInfo from "../routes/GroupInfo";
import GroupList from "../routes/GroupList";
import InviteMember from "../routes/InviteMember";
import ManageUser from "../routes/ManageUser";

export default function GroupRouter() {
  return (
    <>
      <Menu />

      <Routes>
        <Route path="grouplist" element={<GroupList />} />
        <Route path="grouplist/:name" element={<GroupInfo />} />
        <Route path="newgroup" element={<NewGroupPage />} />
        <Route path="invite" element={<InviteMember />} />
        <Route path="manageuser" element={<ManageUser />} />
      </Routes>
    </>
  );
}
