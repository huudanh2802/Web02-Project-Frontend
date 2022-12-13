/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Col } from "react-bootstrap";
import Slider from "react-slick";
import PresentationDTO, { SlideDTO } from "../../../../dtos/PresentationDTO";

import "../Presentation.css";

function SlideBar({
  addSlide,
  detailPresentation,
  currentSlide,
  changeSlide
}: {
  addSlide: (event: any) => void;
  detailPresentation: PresentationDTO;
  currentSlide: SlideDTO;
  changeSlide: (idx: number) => void;
}) {
  const settings = {
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    swipeToSlide: true,
    slidesToShow: 5,
    slideToScroll: 1, // detailPresentation.slides.length,
    infinite: false
  };

  return (
    <Col className="p-slide-bar" lg={1}>
      <Button
        className="mt-1"
        variant="outline-dark"
        style={{ width: "100%" }}
        onClick={addSlide}
      >
        New Slide
      </Button>
      <Slider {...settings}>
        {detailPresentation.slides.map((slide, idx) => (
          <Button
            className={idx === currentSlide.idx ? "selected-slide" : "slide"}
            onClick={() => changeSlide(slide.idx)}
          >
            {idx + 1}
          </Button>
        ))}
      </Slider>
    </Col>
  );
}

export default SlideBar;
