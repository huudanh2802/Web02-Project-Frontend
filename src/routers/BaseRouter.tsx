import { Navigate, Route, Routes } from "react-router";
import GroupList from "../components/Page/GroupList/GroupList";
import { NewGroupPage } from "../components/Page/NewGroupPage/NewGroupPage";
import GroupRouter from "./GroupRouter";
import Login from "../components/Page/Authentication/Login";
import Signup from "../components/Page/Authentication/Signup";
import Verification from "../components/Page/Authentication/Verification";
import Confirm from "../components/Page/Authentication/Confirm";
import GroupDetail from "../components/Page/GroupDetail/GroupDetail";
import AutoJoin from "../components/Page/AutoJoin/AutoJoin";
import MyProfile from "../components/Page/ManageUser/MyProfile";
import OtherProfile from "../components/Page/ManageUser/OtherProfile";
import NewPresentation from "../components/Page/NewPresentation/NewPresentation";
import Presentation from "../components/Page/Presentation/Presentation";

export default function BaseRouter() {
  const isLoggedIn = localStorage.getItem("email") !== null;

  return (
    <Routes>
      <Route path="group" element={<GroupRouter />}>
        <Route path="grouplist" element={<GroupList />} />
        <Route path="detail/:id" element={<GroupDetail />} />
        <Route path="newgroup" element={<NewGroupPage />} />
        <Route path="myprofile" element={<MyProfile />} />
        <Route path="autojoin/:groupId" element={<AutoJoin />} />
        <Route path="profile/:id" element={<OtherProfile />} />
        <Route path="newpresentation/:groupId" element={<NewPresentation />} />
        <Route path="presentation/:id" element={<Presentation />} />
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
