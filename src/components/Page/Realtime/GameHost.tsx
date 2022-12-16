/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { FaComment } from "react-icons/fa";

import BodyHost from "./Components/BodyHost";
import ChatBox from "./Components/ChatBox";

function GameHost({
  socket,
  game
}: {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  game: string;
}) {
  const username = localStorage.getItem("fullname");

  // Chat box handling
  const [showChat, setShowChat] = useState(false);
  const handleShowChat = () => setShowChat(true);
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
          handleCloseChat={handleCloseChat}
        />
      </Row>
      <Button className="fab" variant="dark" onClick={handleShowChat}>
        <FaComment className="mb-2" />
      </Button>
    </Container>
  );
}

export default GameHost;
