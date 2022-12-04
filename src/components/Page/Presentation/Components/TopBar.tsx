import React, { useState } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaPlay, FaEdit, FaArrowLeft } from "react-icons/fa";
import EditPresentationModal from "./EditPresentationModal";

import "../Presentation.css";

function TopBar() {
  const navigate = useNavigate();

  // New Presentation Modal handling
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <EditPresentationModal showModal={showModal} handleClose={handleClose} />
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
                <Button className="p-present-button" variant="primary">
                  <FaPlay style={{ margin: "0 8px 4px 0" }} /> Present
                </Button>
                <Button
                  className="p-present-button"
                  variant="outline-dark"
                  onClick={handleShow}
                >
                  <FaEdit style={{ margin: "0 8px 4px 0" }} /> Edit
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default TopBar;
