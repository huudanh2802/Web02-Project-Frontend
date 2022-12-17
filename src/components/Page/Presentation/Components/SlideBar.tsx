/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Col } from "react-bootstrap";
import Slider from "react-slick";
import { PresentationDTO, SlideDTO } from "../../../../dtos/PresentationDTO";

import "../Presentation.css";
import SlideTypeModal from "./SlideTypeModal";

function SlideBar({
  addMutipleChoice,
  addHeading,
  addParagraph,
  detailPresentation,
  currentSlide,
  changeSlide
}: {
  addMutipleChoice: (event: any) => void;
  addHeading: (event: any) => void;
  addParagraph: (event: any) => void;
  detailPresentation: PresentationDTO;
  currentSlide: SlideDTO;
  changeSlide: (idx: number) => void;
}) {
  const len = detailPresentation.slides.length;
  const settings = {
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    swipeToSlide: true,
    slidesToShow: len < 7 ? len : 7,
    slideToScroll: 1, // detailPresentation.slides.length,
    infinite: false
  };
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Col className="p-slide-bar" lg={1}>
        <Button
          className="mt-1"
          variant="outline-dark"
          style={{ width: "100%" }}
          // onClick={addSlide}
          onClick={handleShow}
        >
          New Slide
        </Button>
        <Slider {...settings}>
          {detailPresentation.slides.map((slide, idx) => (
            <div>
              <Button
                className={
                  idx === currentSlide.idx ? "selected-slide" : "slide"
                }
                onClick={() => changeSlide(slide.idx)}
              >
                {idx + 1}
              </Button>
            </div>
          ))}
          <div />
        </Slider>
      </Col>
      <SlideTypeModal
        show={show}
        setShow={setShow}
        addMutipleChoice={addMutipleChoice}
        addHeading={addHeading}
        addParagraph={addParagraph}
      />
    </>
  );
}

export default SlideBar;
