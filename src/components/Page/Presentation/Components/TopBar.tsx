import React from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaArrowLeft, FaSave } from "react-icons/fa";

import "../Presentation.css";

function TopBar() {
  const navigate = useNavigate();

  return (
    <Container className="p-top-bar" fluid>
      <Row>
        <Col>
          <Button variant="outline-dark" onClick={() => navigate(-1)}>
            <FaArrowLeft style={{ margin: "0 0 4px" }} />
          </Button>
        </Col>
        <Col>
          <h2 className="p-title">Presentation Title</h2>
        </Col>
        <Col>
          <Row>
            <Col />
            <Col>
              <Button className="p-present-button" variant="outline-dark">
                <FaSave style={{ margin: "0 8px 4px 0" }} /> Save
              </Button>
              <Button className="p-present-button ml-2" variant="primary">
                <FaPlay style={{ margin: "0 8px 4px 0" }} /> Present
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default TopBar;
