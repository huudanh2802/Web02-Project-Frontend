/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

function GameList() {
  const { id } = useParams();

  return (
    <Container>
      <Row>
        <h1 className="page-title" style={{ marginBottom: "32px" }}>
          Game sessions
        </h1>
      </Row>
    </Container>
  );
}

export default GameList;
