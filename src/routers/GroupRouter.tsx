/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router";
import Menu from "../components/Common/Menu/Menu";
import ManageGroupPage from "../components/Page/ManageGroupPage/ManageGroupPage";
import { NewGroupPage } from "../components/Page/NewGroupPage/NewGroupPage";

import DetailGroupInfo from "../components/Page/DetailGroupPage/DetailGroupInfo/DetailGroupInfo";
import AutoJoin from "../components/Page/AutoJoin/AutoJoin";
import MyProfile from "../components/Page/ManageUser/MyProfile";
import OtherProfile from "../components/Page/ManageUser/OtherProfile";
import NewPresentation from "../components/Page/NewPresentation/NewPresentation";

export default function GroupRouter() {
  return (
    <>
      <Menu />

      <Routes>
        <Route path="grouplist" element={<ManageGroupPage />} />
        <Route path="detail/:groupId" element={<DetailGroupInfo />} />
        <Route path="newgroup" element={<NewGroupPage />} />
        <Route path="myprofile" element={<MyProfile />} />
        <Route path="autojoin/:groupId" element={<AutoJoin />} />
        <Route path="profile/:id" element={<OtherProfile />} />
        <Route path="newpresentation/:groupId" element={<NewPresentation />} />
      </Routes>
    </>
  );
}
