/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

import "../../../index.css";
import "bootstrap/dist/css/bootstrap.min.css";

function LobbyHost({
  game,
  socket
}: {
  game: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  // Routing
  const navigate = useNavigate();

  interface User {
    id: string;
    username: string;
    game: string;
  }

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    socket.on(`${game}_users`, (data: { users: User[] }) => {
      setUsers(data.users);
    });

    return () => {
      socket.off(`${game}_users`);
    };
  }, []);

  const endGame = () => {
    socket.emit("end_game", { game });
    navigate(-1);
  };

  return (
    <Container fluid style={{ backgroundColor: "#4bb8ad" }}>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={6} lg={4} xs={8}>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4 mx-4">
                <h4 className="fw-bold" style={{ textAlign: "center" }}>
                  Game code: {game}
                </h4>
              </div>
              <header className="fw-bold">Joined users:</header>
              <Row xs={8} md={6} lg={4} style={{ marginTop: "16px" }}>
                {users.map((user) => (
                  <Col>
                    <h5>{user.username}</h5>
                  </Col>
                ))}
              </Row>

              <div className="d-grid mt-4">
                <Button variant="primary">Start game</Button>
              </div>
              <div className="d-grid mt-2">
                <Button variant="danger" onClick={endGame}>
                  End game
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LobbyHost;
