/* eslint-disable no-unused-vars */
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { SlideDTO } from "../../../../dtos/PresentationDTO";

import "../Presentation.css";

function Body({ currentSlide }: { currentSlide: SlideDTO }) {
  return (
    <Col lg={8}>
      <Container className="slide-container" style={{ padding: "16px" }}>
        <Card>
          <Card.Body style={{ fontSize: "30px", margin: "8px" }}>
            {currentSlide.question ? currentSlide.question : "Question"}
          </Card.Body>
        </Card>
        <Row xs={1} md={2} className="g-4" style={{ marginTop: "8px" }}>
          {currentSlide.answers.map((answer, idx) => (
            <Col>
              <Card
                className={
                  currentSlide.correct === answer.id ? "correct-answer" : ""
                }
              >
                <Card.Body>
                  <Card.Title>{answer.placeHolder}</Card.Title>
                  <Card.Text>{answer.answer}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Col>
  );
}

export default Body;
