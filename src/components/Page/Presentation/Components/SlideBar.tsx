/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Col } from "react-bootstrap";
import Slider from "react-slick";
import PresentationDTO, { SlideDTO } from "../../../../dtos/PresentationDTO";

import "../Presentation.css";

function SlideBar() {
  const settings = {
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    swipeToSlide: true,
    slidesToShow: 5,
    slideToScroll: 6, // detailPresentation.slides.length,
    infinite: false
  };

  return (
    <Col className="p-slide-bar" lg={1}>
      <Button variant="primary" style={{ width: "100%" }}>
        New Slide
      </Button>
      <Slider {...settings}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <Button className={idx === 1 ? "selected-slide" : "slide"}>
            {idx + 1}
          </Button>
        ))}
      </Slider>
    </Col>
  );
}

export default SlideBar;
