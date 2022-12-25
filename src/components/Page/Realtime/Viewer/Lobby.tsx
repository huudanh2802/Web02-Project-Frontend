/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Socket } from "socket.io-client";
import "../../../Common/Toast/ToastStyle.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../index.css";

function Lobby({
  username,
  game,
  socket
}: {
  username: string;
  game: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  const navigate = useNavigate();
  const { presentationId, id } = useParams();

  const leaveGame = () => {
    console.log(`leaveGame: ${JSON.stringify({ username, game })}`);
    socket.emit("leave_game", { username, game });
    if (localStorage.getItem("fullname") === null) {
      navigate("/join");
    } else {
      navigate("/group/grouplist");
    }
  };

  // Game handling
  useEffect(() => {
    socket.on("start_game", () => {
      navigate(`/game/${presentationId}/${id}`);
    });

    return () => {
      socket.off("start_game");
    };
  });

  useEffect(() => {
    socket.on("end_game", () => {
      toast("Host has ended the game", {
        className: "toast_container"
      });
      socket.emit("leave_game", { username, game });
      if (localStorage.getItem("fullname") === null) {
        navigate("/join");
      } else {
        navigate("/group/grouplist");
      }
    });

    return () => {
      socket.off("end_game");
    };
  }, []);

  return (
    <Container fluid style={{ backgroundColor: "#4bb8ad" }}>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={6} lg={4} xs={8}>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4 mx-4">
                <h4 className="fw-bold" style={{ textAlign: "center" }}>
                  You&apos;re in! Check for your name!
                </h4>
                <p style={{ textAlign: "center" }}>
                  Also, please wait until the host starts the game
                </p>
              </div>

              <div className="d-grid mt-4">
                <Button variant="danger" onClick={leaveGame}>
                  Leave game
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Lobby;
