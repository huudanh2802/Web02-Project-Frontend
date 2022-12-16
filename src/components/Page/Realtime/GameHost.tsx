/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

import ChatBox from "./Components/Chat/ChatBox";
import BodyHost from "./Components/Body/BodyHost";

function GameHost({
  socket,
  game
}: {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  game: string;
}) {
  const username = localStorage.getItem("fullname");
  const [newChatCount, setNewChatCount] = useState(0);

  // Chat box handling
  const [showChat, setShowChat] = useState(false);
  const handleShowChat = () => {
    setShowChat(true);
    setNewChatCount(0);
  };
  const handleCloseChat = () => setShowChat(false);

  return (
    <Container className="game-container game-container-primary" fluid>
      <Row>
        <BodyHost socket={socket} game={game} />
        <ChatBox
          username={username!}
          userRole={0}
          game={game}
          socket={socket}
          showChat={showChat}
          handleShowChat={handleShowChat}
          handleCloseChat={handleCloseChat}
          newChatCount={newChatCount}
          setNewChatCount={setNewChatCount}
        />
      </Row>
    </Container>
  );
}

export default GameHost;
