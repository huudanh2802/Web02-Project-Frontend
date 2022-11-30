/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router";
import Menu from "../components/Common/Menu/Menu";
import ManageGroupPage from "../components/Page/ManageGroupPage/ManageGroupPage";
import { NewGroupPage } from "../components/Page/NewGroupPage/NewGroupPage";
import GroupInfo from "../components/Page/DetailGroupPage/GroupInfo/GroupInfo";

import ManageUser from "../routes/ManageUser";
import InviteMember from "../components/Page/InviteMember/InviteMember";

export default function GroupRouter() {
  return (
    <>
      <Menu />

      <Routes>
        <Route path="grouplist" element={<ManageGroupPage />} />
        <Route path="detail/:groupId" element={<GroupInfo />} />
        <Route path="newgroup" element={<NewGroupPage />} />
        <Route path="invite" element={<InviteMember />} />
        <Route path="manageuser" element={<ManageUser />} />
      </Routes>
    </>
  );
}
