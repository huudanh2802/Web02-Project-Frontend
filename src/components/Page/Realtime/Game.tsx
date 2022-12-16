/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { FaComment } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import PresentationDTO from "../../../dtos/PresentationDTO";
import { axiosPrivate } from "../../../token/axiosPrivate";

import ChatBox from "./Components/ChatBox";
import Body from "./Components/Body";

import "./Realtime.css";

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
  const [bg, setBg] = useState("primary");
  const loggedIn = localStorage.getItem("email") !== null;

  // Chat box handling
  const [showChat, setShowChat] = useState(false);
  const handleShowChat = () => setShowChat(true);
  const handleCloseChat = () => setShowChat(false);

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
    <Container className={`game-container game-container-${bg}`} fluid>
      <Row>
        <Body
          username={username}
          game={game}
          socket={socket}
          presentation={presentation}
          setBg={setBg}
        />
        <ChatBox
          username={username}
          userRole={loggedIn ? 1 : 2}
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

export default Game;
