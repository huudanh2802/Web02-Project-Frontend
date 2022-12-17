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
import NewPresentation from "../components/Page/Presentation/NewPresentation/NewPresentation";
import Presentation from "../components/Page/Presentation/Presentation";
import Join from "../components/Page/Realtime/Viewer/Join";
import Lobby from "../components/Page/Realtime/Viewer/Lobby";
import LobbyHost from "../components/Page/Realtime/Host/LobbyHost";
import Game from "../components/Page/Realtime/Viewer/Game";
import GameHost from "../components/Page/Realtime/Host/GameHost";

// Socket IO
const socket = io(`${process.env.REACT_APP_API_SERVER}`);

function BaseRouter() {
  const isLoggedIn = localStorage.getItem("email") !== null;

  // Data handling
  const [username, setUsername] = useState("");
  const [game, setGame] = useState("");

  return (
    <Routes>
      <Route
        path="group"
        element={<GroupRouter setGame={setGame} socket={socket} />}
      >
        <Route path="grouplist" element={<GroupList />} />
        <Route path="detail/:id" element={<GroupDetail />} />
        <Route path="newgroup" element={<NewGroupPage />} />
        <Route path="myprofile" element={<MyProfile />} />
        <Route path="autojoin/:groupId" element={<AutoJoin />} />
        <Route path="profile/:id" element={<OtherProfile />} />
        <Route path="newpresentation" element={<NewPresentation />} />
        <Route
          path="presentation/:id"
          element={<Presentation setGame={setGame} socket={socket} />}
        />
      </Route>
      <Route path="/login" element={<Login setUsername={setUsername} />} />
      <Route path="/signup" element={<Signup setUsername={setUsername} />} />
      <Route path="/verification" element={<Verification />} />
      <Route path="/confirm/:token" element={<Confirm />} />
      <Route
        path="/join"
        element={
          <Join
            username={username}
            setUsername={setUsername}
            game={game}
            setGame={setGame}
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
      {isLoggedIn && (
        <Route
          path="/lobbyhost/:presentationId/:id"
          element={<LobbyHost game={game} socket={socket} />}
        />
      )}
      <Route
        path="/lobby/:presentationId/:id"
        element={<Lobby username={username} game={game} socket={socket} />}
      />
      {isLoggedIn && (
        <Route
          path="/gamehost/:presentationId/:id"
          element={<GameHost socket={socket} game={game} />}
        />
      )}
      <Route
        path="/game/:presentationId/:id"
        element={<Game socket={socket} game={game} username={username} />}
      />
    </Routes>
  );
}

export default BaseRouter;
