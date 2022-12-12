/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Row } from "react-bootstrap";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

import TopBar from "./Components/TopBar";
import SlideBar from "./Components/SlideBar";

import "./Presentation.css";

function Presentation({
  setGame,
  socket
}: {
  setGame: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  return (
    <>
      <TopBar />
      <Container fluid>
        <Row className="mt-2">
          <SlideBar />
        </Row>
      </Container>
    </>
  );
}

export default Presentation;
