/* eslint-disable react/jsx-props-no-spreading */

import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FaGoogle, FaExclamationTriangle } from "react-icons/fa";
import "../index.css";
import background from "../bg-2.jpg";
import "./FormStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  // Form handling
  const formAuthSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must contain at least 6 characters"),
    confirm: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password")], "Password does not match")
  });
  const formOptions = { resolver: yupResolver(formAuthSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  // Background style
  const bgStyle = {
    backgroundImage: `url(${background})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  };

  // First form: Email & password
  return (
    <Container fluid style={bgStyle}>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12} />
        <Col md={6} lg={4} xs={8}>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4 mx-4">
                <h2 className="fw-bold mb-4" style={{ textAlign: "center" }}>
                  Sign Up
                </h2>
                <div className="mb-3">
                  <Form
                    onSubmit={handleSubmit((data) =>
                      alert(JSON.stringify(data))
                    )}
                  >
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
                        {...register("email")}
                      />
                    </Form.Group>
                    {errors.email && errors.email.type === "required" && (
                      <p className="error">
                        <FaExclamationTriangle className="mx-2" />
                        Email account is required
                      </p>
                    )}

                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label
                        className="text-center"
                        style={{ fontWeight: "bold" }}
                      >
                        Password
                      </Form.Label>
                      <Form.Control type="password" {...register("password")} />
                    </Form.Group>
                    {errors.password && errors.password.type === "required" && (
                      <p className="error">
                        <FaExclamationTriangle className="mx-2" />
                        Password is required
                      </p>
                    )}
                    {errors.password && errors.password.type === "min" && (
                      <p className="error">
                        <FaExclamationTriangle className="mx-2" />
                        Password must contain at least 6 characters
                      </p>
                    )}

                    <Form.Group
                      className="mb-3"
                      controlId="formConfirmPassword"
                    >
                      <Form.Label
                        className="text-center"
                        style={{ fontWeight: "bold" }}
                      >
                        Confirm Password
                      </Form.Label>
                      <Form.Control type="password" {...register("confirm")} />
                    </Form.Group>
                    {errors.confirm && errors.confirm.type === "required" && (
                      <p className="error">
                        <FaExclamationTriangle className="mx-2" />
                        You must re-enter your password
                      </p>
                    )}
                    {errors.confirm && errors.confirm.type === "oneOf" && (
                      <p className="error">
                        <FaExclamationTriangle className="mx-2" />
                        Password does not match
                      </p>
                    )}

                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Continue
                      </Button>
                    </div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Already have an account?{" "}
                      <a href="{''}" className="text-primary fw-bold">
                        Login
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

export default Signup;
