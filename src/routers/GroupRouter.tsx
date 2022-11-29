/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router";
import Menu from "../components/Menu/Menu";
import { NewGroupPage } from "../components/Routes/NewGroupPage/NewGroupPage";
import { GroupInfo } from "../components/Routes/GroupInfo/GroupInfo";
import GroupList from "../components/Routes/GroupList/GroupList";
import InviteMember from "../components/Routes/InviteMember/InviteMember";
import { ManageUser } from "../components/Routes/ManageUser/ManageUser";

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
