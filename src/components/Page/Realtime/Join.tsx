/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useForm, FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

import { FaExclamationTriangle } from "react-icons/fa";
import "../../../index.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup({
  username,
  setUsername,
  presentation,
  setPresentation,
  socket
}: {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  presentation: string;
  setPresentation: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  // Routing
  const navigate = useNavigate();

  // Realtime functions
  const joinPresentation = () => {
    if (username !== "" && presentation !== "") {
      console.log(
        `joinPresentation: ${JSON.stringify({ username, presentation })}`
      );
      socket.emit("join_presentation", { username, presentation });
      navigate("/realtime", { replace: true });
    }
  };

  // Handle changes
  const handleChangeUsername = (event: any) => {
    setUsername(event.target.value);
    console.log(`Username: ${event.target.value} / ${username}`);
  };
  const handleChangePresentation = (event: any) => {
    setPresentation(event.target.value);
    console.log(`Presentation: ${event.target.value} / ${presentation}`);
  };

  // Form handling
  const formSchema = Yup.object().shape({
    formUsername: Yup.string().required("Username is required"),
    formPresentation: Yup.string().required("Room ID is required")
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    joinPresentation();
  };
  const { errors } = formState;

  return (
    <Container fluid style={{ backgroundColor: "#4bb8ad" }}>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={6} lg={4} xs={8}>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4 mx-4">
                <h2 className="fw-bold mb-4" style={{ textAlign: "center" }}>
                  Join a Presentation
                </h2>
                <div className="mb-3">
                  <Form onSubmit={handleSubmit(onSubmit)}>
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
                    {errors.formUsername && (
                      <p className="error">
                        <FaExclamationTriangle className="mx-2" />
                        Username is required
                      </p>
                    )}
                    <Form.Group className="mb-3" controlId="formPresentation">
                      <Form.Label
                        className="text-center"
                        style={{ fontWeight: "bold" }}
                      >
                        Presentation ID
                      </Form.Label>
                      <Form.Control
                        type="id"
                        placeholder="Enter presentation ID"
                        {...register("formPresentation", { required: true })}
                        onChange={handleChangePresentation}
                      />
                    </Form.Group>
                    {errors.formPresentation && (
                      <p className="error">
                        <FaExclamationTriangle className="mx-2" />
                        Presentation ID is required
                      </p>
                    )}

                    <div className="d-grid mt-4">
                      <Button variant="primary" type="submit">
                        Join
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Want to create presentations?{" "}
                      <a href="/login" className="text-primary fw-bold">
                        Login
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Signup;
