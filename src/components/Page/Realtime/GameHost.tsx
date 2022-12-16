/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React from "react";
import { Container, Row } from "react-bootstrap";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

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

  return (
    <Container className="game-container game-container-primary" fluid>
      <Row>
        <BodyHost socket={socket} game={game} />
        <ChatBox
          username={username!}
          userRole={0}
          game={game}
          socket={socket}
        />
      </Row>
    </Container>
  );
}

export default GameHost;
