import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import io from "socket.io-client";
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
import Join from "../components/Page/Realtime/Join";

// Socket IO
const socket = io(`${process.env.REACT_APP_API_SERVER}`);

function BaseRouter() {
  const isLoggedIn = localStorage.getItem("email") !== null;

  // Data handling
  const [username, setUsername] = useState("");
  const [presentation, setPresentation] = useState("");

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
      <Route
        path="/join"
        element={
          <Join
            username={username}
            setUsername={setUsername}
            presentation={presentation}
            setPresentation={setPresentation}
            socket={socket}
          />
        }
      />
      {isLoggedIn && (
        <Route path="" element={<Navigate to="/group/grouplist" replace />} />
      )}
      {!isLoggedIn && (
        <Route path="" element={<Navigate to="/join" replace />} />
      )}
    </Routes>
  );
}

export default BaseRouter;
