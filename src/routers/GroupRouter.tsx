/* eslint-disable no-unused-vars */
import React from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

import { Navigate, Route, Routes } from "react-router";
import Menu from "../components/Common/Menu/Menu";
import GroupList from "../components/Page/GroupList/GroupList";
import { NewGroupPage } from "../components/Page/NewGroupPage/NewGroupPage";

import GroupDetail from "../components/Page/GroupDetail/GroupDetail";
import AutoJoin from "../components/Page/AutoJoin/AutoJoin";
import MyProfile from "../components/Page/ManageUser/MyProfile";
import OtherProfile from "../components/Page/ManageUser/OtherProfile";
import NewPresentation from "../components/Page/Presentation/NewPresentation/NewPresentation";
import Presentation from "../components/Page/Presentation/Presentation";
import GameList from "../components/Page/GameList/GameList";

export default function GroupRouter({
  setGame,
  socket
}: {
  setGame: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  return (
    <>
      <Menu />

      <Routes>
        <Route path="grouplist" element={<GroupList />} />
        <Route
          path="detail/:groupId"
          element={<GroupDetail setGame={setGame} socket={socket} />}
        />
        <Route path="newgroup" element={<NewGroupPage />} />
        <Route path="myprofile" element={<MyProfile />} />
        <Route path="autojoin/:groupId" element={<AutoJoin />} />
        <Route path="profile/:id" element={<OtherProfile />} />
        <Route path="newpresentation" element={<NewPresentation />} />
        <Route
          path="presentation/:id"
          element={<Presentation setGame={setGame} socket={socket} />}
        />
        <Route path="gamelist/:id" element={<GameList />} />
      </Routes>
    </>
  );
}
