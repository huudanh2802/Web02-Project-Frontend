import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../../index.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  return (
    <Container fluid style={{ backgroundColor: "#4bb8ad" }}>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={6} lg={4} xs={8}>
          <Card className="shadow">
            <Card.Body>
              <div className="mt-md-4 mx-4">
                <h2 className="fw-bold mb-4" style={{ textAlign: "center" }}>
                  Check your email!
                </h2>
                <div className="mt-2" style={{ textAlign: "center" }}>
                  <p>We&apos;ve just sent a verification link to your email.</p>
                  <p>Please verify your account so you may log in.</p>
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
