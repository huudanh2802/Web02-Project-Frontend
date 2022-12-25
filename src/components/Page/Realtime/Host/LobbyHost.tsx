/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { axiosPrivate } from "../../../../token/axiosPrivate";

import GroupDTO from "../../../../dtos/GroupDTO";

import "../../../../index.css";
import "bootstrap/dist/css/bootstrap.min.css";

function LobbyHost({
  game,
  socket
}: {
  game: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { presentationId, groupId, id } = useParams();

  interface User {
    id: string;
    username: string;
    game: string;
  }

  const [users, setUsers] = useState<User[]>([]);
  const [cohosts, setCohosts] = useState<User[]>([]);

  useEffect(() => {
    socket.on(`${game}_users`, (data: { users: User[] }) => {
      setUsers(data.users);
    });
    socket.on(`${game}_cohosts`, (data: { cohosts: User[] }) => {
      setCohosts(data.cohosts);
    });

    return () => {
      socket.off(`${game}_users`);
      socket.off(`${game}_cohosts`);
    };
  }, []);

  // Group presentation
  const [group, setGroup] = useState<GroupDTO>();
  useEffect(() => {
    if (groupId) {
      setLoading(true);
      axiosPrivate({
        method: "get",
        url: `${process.env.REACT_APP_API_SERVER}/group/get/${groupId}`
      })
        .then((response: any) => {
          setGroup(response.data);
        })
        .finally(() => setLoading(false));
    }
  }, [groupId]);

  // Game handling
  const startGame = () => {
    socket.emit("start_game", { game });
    navigate(`/gamehost/${presentationId}/${id}`);
  };

  const endGame = () => {
    socket.emit("end_game", { game, groupId });
    navigate("/group/grouplist");
  };

  return (
    <Container fluid style={{ backgroundColor: "#4bb8ad" }}>
      {loading && (
        <div className="spinner-background">
          <Spinner animation="border" variant="light" />
        </div>
      )}
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={8}>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4 mx-4">
                <h4 className="fw-bold" style={{ textAlign: "center" }}>
                  {groupId
                    ? `${group?.name} presentation`
                    : `Game code: ${game}`}
                </h4>
              </div>
              {users.length > 0 && (
                <>
                  <header className="fw-bold">Joined users:</header>
                  <Row xs={4} md={4} lg={3} style={{ marginTop: "16px" }}>
                    {users.map((user) => (
                      <Col>
                        <h5 style={{ textAlign: "center" }}>{user.username}</h5>
                      </Col>
                    ))}
                  </Row>
                </>
              )}
              {cohosts.length > 0 && (
                <>
                  <header className="fw-bold mt-4">Joined co-hosts:</header>
                  <Row xs={4} md={4} lg={3} style={{ marginTop: "16px" }}>
                    {cohosts.map((cohost) => (
                      <Col>
                        <h5 style={{ textAlign: "center" }}>
                          {cohost.username}
                        </h5>
                      </Col>
                    ))}
                  </Row>
                </>
              )}

              <div className="d-grid mt-4">
                <Button variant="primary" onClick={startGame}>
                  Start game
                </Button>
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
