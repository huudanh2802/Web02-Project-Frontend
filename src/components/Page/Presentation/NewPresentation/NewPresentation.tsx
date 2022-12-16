/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import PresentationDTO, { SlideDTO } from "../../../../dtos/PresentationDTO";
import { axiosPrivate } from "../../../../token/axiosPrivate";

import TopBar from "../Components/TopBar";
import SlideBar from "../Components/SlideBar";
import Body from "../Components/Body";
import SlideEdit from "../Components/SlideEdit";

import "../Presentation.css";

function NewPresentation() {
  const { groupId } = useParams();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState<SlideDTO>({
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
    groupId: groupId!,
    slides: [currentSlide]
  });

  const {
    register,
    handleSubmit: handleSlide,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: useMemo(() => currentSlide, [currentSlide])
  });

  const {
    register: registerName,
    trigger,
    handleSubmit: handleSubmitName,
    formState: { errors: errorsName }
  } = useForm();

  async function sendSlide() {
    const result = await trigger("name");
    console.log(result);
    if (result) {
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
  }

  useEffect(() => {
    reset(currentSlide);
  }, [currentSlide, newPresentation, reset]);

  const addSlide = (event: any) => {
    const newSlide: SlideDTO = {
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
    console.log(currentSlide);
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
      />
      <Row className="mt-2">
        <SlideBar
          addSlide={addSlide}
          detailPresentation={newPresentation}
          currentSlide={currentSlide}
          changeSlide={changeSlide}
        />
        <Body currentSlide={currentSlide} />
        <SlideEdit
          currentSlide={currentSlide}
          detailPresentation={newPresentation}
          setCurrentSlide={setCurrentSlide}
          setPresentation={setNewPresentation}
          register={register}
          handleSlide={handleSlide}
        />
      </Row>
    </Container>
  );
}

export default NewPresentation;
