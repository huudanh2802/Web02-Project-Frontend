/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import PresentationDTO from "../../../dtos/PresentationDTO";
import { axiosPrivate } from "../../../token/axiosPrivate";

import ChatBox from "./Components/ChatBox";
import Body from "./Components/Body";

function Game({
  username,
  game,
  socket
}: {
  username: string;
  game: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  const { presentationId, id } = useParams();
  const [presentation, setPresentation] = useState<PresentationDTO>();

  useEffect(() => {
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/game/get/${presentationId}`
    }).then((response: any) => {
      setPresentation(response.data);
      console.log(response.data);
    });
  }, [presentationId]);

  return (
    <Container className="game-container" fluid>
      <Row>
        <Body
          username={username}
          game={game}
          socket={socket}
          presentation={presentation}
        />
        <ChatBox />
      </Row>
    </Container>
  );
}

export default Game;
