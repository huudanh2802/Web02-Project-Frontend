/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

import { FaExclamationTriangle } from "react-icons/fa";
import "../../../../index.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Join({
  username,
  setUsername,
  game,
  setGame,
  socket
}: {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  game: string;
  setGame: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  // Routing
  const navigate = useNavigate();

  const joinGame = () => {
    if (username !== "" && game !== "") {
      console.log(`joinGame: ${JSON.stringify({ username, game })}`);
      socket.emit("join_game", { username, game });
    }
  };

  useEffect(() => {
    socket.on(
      "join_game_result",
      (data: {
        success: boolean;
        game: string;
        presentation: string;
        isPrivate: boolean;
      }) => {
        console.log(`Game ${data.game} available: ${data.success}`);
        if (data.success === true) {
          console.log(`Game: ${data.game}`);
          navigate(`/lobby/${data.presentation}/${data.game}`);
        } else if (data.success === false) {
          const gameType = data.isPrivate ? "private" : "non-existent";
          alert(`Failed to join ${gameType} game ${data.game}`);
        }
      }
    );

    return () => {
      socket.off("join_game_result");
    };
  }, []);

  // Handle changes
  const handleChangeUsername = (event: any) => {
    setUsername(event.target.value);
  };
  const handleChangeGame = (event: any) => {
    setGame(event.target.value);
  };

  // Form handling
  const formSchema = Yup.object().shape({
    formUsername: Yup.string().required("Username is required"),
    formGame: Yup.string().required("Game ID is required")
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const onSubmit = () => {
    joinGame();
  };
  const { errors } = formState;

  const loggedIn = localStorage.getItem("fullname");
  if (loggedIn !== null) {
    setUsername(loggedIn);
  }

  return (
    <Container fluid style={{ backgroundColor: "#4bb8ad" }}>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={6} lg={4} xs={8}>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4 mx-4">
                <h2 className="fw-bold mb-4" style={{ textAlign: "center" }}>
                  Join a Game
                </h2>
                <div className="mb-3">
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    {!loggedIn && (
                      <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label
                          className="text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          Username
                        </Form.Label>
                        <Form.Control
                          type="username"
                          placeholder="Enter your username"
                          {...register("formUsername", { required: true })}
                          onChange={handleChangeUsername}
                        />
                      </Form.Group>
                    )}
                    {loggedIn && (
                      <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label
                          className="text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          Username
                        </Form.Label>
                        <Form.Control
                          plaintext
                          readOnly
                          defaultValue={username}
                          {...register("formUsername", { required: true })}
                        />
                      </Form.Group>
                    )}
                    {!loggedIn && errors.formUsername && (
                      <p className="error">
                        <FaExclamationTriangle className="mx-2" />
                        Username is required
                      </p>
                    )}
                    <Form.Group className="mb-3" controlId="formGame">
                      <Form.Label
                        className="text-center"
                        style={{ fontWeight: "bold" }}
                      >
                        Game ID
                      </Form.Label>
                      <Form.Control
                        type="id"
                        placeholder="Enter game ID"
                        {...register("formGame", { required: true })}
                        onChange={handleChangeGame}
                      />
                    </Form.Group>
                    {errors.formGame && (
                      <p className="error">
                        <FaExclamationTriangle className="mx-2" />
                        Game ID is required
                      </p>
                    )}

                    <div className="d-grid mt-4">
                      <Button variant="primary" type="submit">
                        Join
                      </Button>
                    </div>
                  </Form>
                  {!loggedIn && (
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Want to create games?{" "}
                        <a href="/login" className="text-primary fw-bold">
                          Login
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Join;
