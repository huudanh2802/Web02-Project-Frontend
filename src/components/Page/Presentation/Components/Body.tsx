/* eslint-disable no-unused-vars */
import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { MutipleChoiceDTO, Slide } from "../../../../dtos/PresentationDTO";

import "../Presentation.css";
import MutipleChoiceSlide from "../PreviewSlideType/MutipleChoiceSlide";
import HeadingSlide from "../PreviewSlideType/HeadingSlide";
import ParagraphSlide from "../PreviewSlideType/ParagraphSlide";

function Body({ currentSlide }: { currentSlide: Slide }) {
  const setCurrentSlideType = () => {
    switch (currentSlide.type) {
      case 1: {
        return <MutipleChoiceSlide currentSlide={currentSlide} />;
      }
      case 2: {
        return <HeadingSlide currentSlide={currentSlide} />;
      }
      case 3: {
        return <ParagraphSlide currentSlide={currentSlide} />;
      }
      default: {
        return null;
      }
    }
  };

  return (
    <Col lg={8}>
      <Container className="slide-container" style={{ padding: "16px" }}>
        {setCurrentSlideType()}
      </Container>
    </Col>
  );
}

export default Body;
