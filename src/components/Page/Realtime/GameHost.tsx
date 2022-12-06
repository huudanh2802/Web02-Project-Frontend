import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

function GameHost() {
  const { presentation, id } = useParams();

  return (
    <Container fluid style={{ backgroundColor: "#4bb8ad" }}>
      <Row>
        <Col>
          <h1>{presentation}</h1>
          <h1>{id}</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default GameHost;
