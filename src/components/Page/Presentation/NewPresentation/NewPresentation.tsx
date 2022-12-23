/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  HeadingDTO,
  MutipleChoiceDTO,
  ParagraphDTO,
  PresentationDTO,
  SlideDTO
} from "../../../../dtos/PresentationDTO";
import { axiosPrivate } from "../../../../token/axiosPrivate";

import Body from "../Components/Body";
import SlideBar from "../Components/SlideBar";
import SlideEdit from "../Components/SlideEdit";
import TopBar from "../Components/TopBar";

import "../Presentation.css";

function NewPresentation() {
  const localId = localStorage.getItem("id");
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState<SlideDTO>({
    type: 1,
    question: "",
    idx: 0,
    correct: "A",
    answers: [
      {
        id: "A",
        answer: "Answer A",
        placeHolder: "A."
      }
    ]
  });
  const [newPresentation, setNewPresentation] = useState<PresentationDTO>({
    name: "Presentation Name",
    creator: localId!,
    slides: [currentSlide]
  });

  const {
    register: registerName,
    trigger,
    handleSubmit: handleSubmitName,
    formState: { errors: errorsName }
  } = useForm();
  async function sendSlide() {
    axiosPrivate({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/presentation/newpresentation`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      data: newPresentation
    }).then((response) => {
      navigate(`/group/presentation/${response.data}`);
    });
  }

  const addMutipleChoice = (event: any) => {
    const newSlide: MutipleChoiceDTO = {
      type: 1,
      question: "",
      correct: "A",
      idx: newPresentation.slides.length,
      answers: [
        {
          id: "A",
          answer: "Answer A",
          placeHolder: "A."
        }
      ]
    };
    setNewPresentation((presentation) => ({
      ...presentation,
      slides: [...presentation.slides, newSlide]
    }));
    setCurrentSlide(newSlide);
  };

  const addHeading = (event: any) => {
    const newSlide: HeadingDTO = {
      idx: newPresentation.slides.length,
      type: 2,
      heading: ""
    };
    setNewPresentation((presentation) => ({
      ...presentation,
      slides: [...presentation.slides, newSlide]
    }));
    setCurrentSlide(newSlide);
  };

  const addParagraph = (event: any) => {
    const newSlide: ParagraphDTO = {
      type: 3,
      idx: newPresentation.slides.length,

      heading: "",
      paragraph: ""
    };
    setNewPresentation((presentation) => ({
      ...presentation,
      slides: [...presentation.slides, newSlide]
    }));
    setCurrentSlide(newSlide);
  };

  const changeSlide = (idx: number) => {
    const slideChange = newPresentation.slides[idx];
    setCurrentSlide(slideChange);
  };
  return (
    <Container fluid>
      <TopBar
        sendSlide={() => sendSlide()}
        present={undefined}
        detailPresentation={newPresentation}
        setPresentation={setNewPresentation}
        registerName={registerName}
        handleSubmitName={handleSubmitName}
        checkOwn={false}
      />
      <Row className="mt-2">
        <SlideBar
          addMutipleChoice={addMutipleChoice}
          addHeading={addHeading}
          addParagraph={addParagraph}
          detailPresentation={newPresentation}
          currentSlide={currentSlide}
          changeSlide={changeSlide}
        />
        <Body currentSlide={currentSlide} />
        <Col lg={3}>
          <SlideEdit
            currentSlide={currentSlide}
            detailPresentation={newPresentation}
            setCurrentSlide={setCurrentSlide}
            setPresentation={setNewPresentation}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default NewPresentation;
