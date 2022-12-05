/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useForm, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";

import { FaExclamationTriangle } from "react-icons/fa";
import "../../../index.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  // Routing
  // const navigate = useNavigate();

  // Form handling
  const formSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    presentationId: Yup.string().required("Room ID is required")
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const onSubmit = (data: FieldValues) => {
    console.log(data);
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
                        {...register("username", { required: true })}
                      />
                    </Form.Group>
                    {errors.username && (
                      <p className="error">
                        <FaExclamationTriangle className="mx-2" />
                        Username is required
                      </p>
                    )}
                    <Form.Group className="mb-3" controlId="formPresentationId">
                      <Form.Label
                        className="text-center"
                        style={{ fontWeight: "bold" }}
                      >
                        Presentation ID
                      </Form.Label>
                      <Form.Control
                        type="id"
                        placeholder="Enter presentation ID"
                        {...register("presentationId", { required: true })}
                      />
                    </Form.Group>
                    {errors.presentationId && (
                      <p className="error">
                        <FaExclamationTriangle className="mx-2" />
                        Room ID is required
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
