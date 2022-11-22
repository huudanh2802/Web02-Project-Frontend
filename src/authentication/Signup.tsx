import React, { useState, useCallback } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaGoogle } from "react-icons/fa";
import "../index.css";
import background from "../bg-1.jpg";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  // Background style
  const bgStyle = {
    backgroundImage: `url(${background})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat"
  };

  // Sign-up forms
  const [form, setForm] = useState(0);
  const updateForm = useCallback(() => setForm(1), []);

  if (form === 0)
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
                    <Form>
                      <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label
                          className="text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          Email address
                        </Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                      </Form.Group>

                      <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label
                          className="text-center"
                          style={{ fontWeight: "bold" }}
                        >
                          Password
                        </Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>

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
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>

                      <div className="d-grid">
                        <Button variant="primary" onClick={updateForm}>
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

  return (
    <Container fluid style={{ backgroundColor: "#318F9B" }}>
      <div>a</div>
    </Container>
  );
}

export default Login;
