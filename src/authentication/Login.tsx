/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import { FaGoogle, FaExclamationTriangle } from "react-icons/fa";
import "../index.css";
import background from "../bg-1.jpg";
import "./FormStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";

type FormInputs = {
  email: string;
  password: string;
};

function Login() {
  // Form handling
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>();
  const onSubmit: SubmitHandler<FormInputs> = (data) => console.log(data);

  const bgStyle = {
    backgroundImage: `url(${background})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  };

  return (
    <Container fluid style={bgStyle}>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12} />
        <Col md={6} lg={4} xs={8}>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4 mx-4">
                <h2 className="fw-bold mb-4" style={{ textAlign: "center" }}>
                  Login
                </h2>
                <div className="mb-3">
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label
                        className="text-center"
                        style={{ fontWeight: "bold" }}
                      >
                        Email address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        {...register("email", { required: true })}
                      />
                    </Form.Group>
                    {errors.email && (
                      <p className="error">
                        <FaExclamationTriangle className="mx-2" />
                        This field is required
                      </p>
                    )}

                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label
                        className="text-center"
                        style={{ fontWeight: "bold" }}
                      >
                        Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder=""
                        {...register("password", { required: true })}
                      />
                    </Form.Group>
                    {errors.password && (
                      <p className="error">
                        <FaExclamationTriangle className="mx-2" />
                        This field is required
                      </p>
                    )}

                    <Form.Group className="mb-3" controlId="formPassword">
                      <p className="small">
                        <a className="text-primary" href="#!">
                          Forgot password?
                        </a>
                      </p>
                    </Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Login
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Don&apos;t have an account?{" "}
                      <a href="{''}" className="text-primary fw-bold">
                        Sign Up
                      </a>
                    </p>
                  </div>
                  <hr />
                  <div className="d-grid mt-3">
                    <Button variant="outline-dark">
                      <FaGoogle /> Continue with Google
                    </Button>
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

export default Login;
