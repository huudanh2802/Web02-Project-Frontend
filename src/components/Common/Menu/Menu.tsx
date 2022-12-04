import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Nav,
  Navbar,
  Image,
  Col,
  Container,
  Row,
  Button
} from "react-bootstrap";

import "./Menu.css";

function Menu() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    console.log("Local storage reset");
    navigate("/login");
  };

  return (
    <Container className="menu-container">
      <Row>
        <Navbar className="navbar">
          <Col lg={2} style={{ height: "inherit" }}>
            <Image
              src="/assets/kahot-logo.svg"
              className="logo"
              onClick={() => navigate("/")}
            />
          </Col>
          <Col lg={7} style={{ height: "inherit" }} />
          <Col lg={3} style={{ height: "inherit" }}>
            <Nav className="menu-end">
              <img
                src="/assets/avatar.svg"
                alt="Avatar"
                style={{ width: 32, height: 32, marginRight: "16px" }}
              />
              <Button variant="light" onClick={() => logout()}>
                Logout
              </Button>
            </Nav>
          </Col>
        </Navbar>
      </Row>
    </Container>
  );
}

export default Menu;
