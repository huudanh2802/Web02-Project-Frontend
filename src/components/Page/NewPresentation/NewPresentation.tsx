/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "./NewPresentation.css";
import Slider from "react-slick";
import { useForm } from "react-hook-form";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useNavigation, useParams } from "react-router";
import Select from "react-select";
import { FaPlus } from "react-icons/fa";
import { nextChar } from "../../../helpers/functions";

import PresentationDTO, { SlideDTO } from "../../../dtos/PresentationDTO";
import { axiosPrivate } from "../../../token/axiosPrivate";

export default function NewPresentation() {
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
        placeHolder: `Option A`
      }
    ]
  });
  const [newPresenation, setNewPresentation] = useState<PresentationDTO>({
    name: "",
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
    register: register2,
    trigger,
    formState: { errors: errors2 }
  } = useForm();

  async function sendSlide() {
    const result = await trigger("name");
    if (result) {
      axiosPrivate({
        method: "post",
        url: `${process.env.REACT_APP_API_SERVER}/presentation/newpresentation`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },

        data: newPresenation
      }).then((response) => {
        navigate(`/group/presentation/${response.data}`);
      });
    }
  }
  useEffect(() => {
    reset(currentSlide);
  }, [currentSlide, newPresenation, reset]);

  const onSubmit = (data: any) => {
    newPresenation.slides[currentSlide.idx] = currentSlide;
    setNewPresentation(newPresenation);
  };

  const addAnswer = (event: any) => {
    const newCurrentSlide = structuredClone(currentSlide);
    setCurrentSlide((slide) => ({
      ...slide,
      answers: [
        ...slide.answers,
        {
          id: nextChar(slide.answers[slide.answers.length - 1]!.id),
          answer: `Answer ${nextChar(
            slide.answers[slide.answers.length - 1]!.id
          )}`,
          placeHolder: `Option ${nextChar(
            slide.answers[slide.answers.length - 1]!.id
          )}`
        }
      ]
    }));
    newCurrentSlide.answers.push({
      id: nextChar(
        newCurrentSlide.answers[newCurrentSlide.answers.length - 1]!.id
      ),
      answer: `Answer ${nextChar(
        newCurrentSlide.answers[newCurrentSlide.answers.length - 1]!.id
      )}`,
      placeHolder: `Option ${nextChar(
        newCurrentSlide.answers[newCurrentSlide.answers.length - 1]!.id
      )}`
    });
    newPresenation.slides[currentSlide.idx] = newCurrentSlide;
    setNewPresentation(newPresenation);
  };
  const removeAnswer = (event: any) => {
    const updateAnswer = currentSlide.answers;
    updateAnswer.pop();
    setCurrentSlide((slide) => ({
      ...slide,
      answers: updateAnswer
    }));
    const newCurrentSlide = currentSlide;
    newCurrentSlide.answers = updateAnswer;
    newPresenation.slides[currentSlide.idx] = newCurrentSlide;
    setNewPresentation(newPresenation);
  };

  const setAnswer = (event: any, idx: number) => {
    const updateAnswer = currentSlide.answers;
    updateAnswer[idx].answer = event.target.value;
    setCurrentSlide((slide) => ({
      ...slide,
      answers: updateAnswer
    }));
    const newCurrentSlide = currentSlide;
    newCurrentSlide.answers = updateAnswer;
    newPresenation.slides[currentSlide.idx] = newCurrentSlide;
    setNewPresentation(newPresenation);
  };

  const setCorrectAnswer = (event: any) => {
    const correct = event.value;
    setCurrentSlide((slide) => ({
      ...slide,
      correct
    }));
    const newCurrentSlide = currentSlide;
    newCurrentSlide.correct = correct;
    newPresenation.slides[currentSlide.idx] = newCurrentSlide;
    setNewPresentation(newPresenation);
  };

  const setQuestion = (event: any) => {
    setCurrentSlide((slide) => ({
      ...slide,
      question: event.target.value
    }));
    const quesntionSlide = currentSlide;
    quesntionSlide.question = event.target.value;
    newPresenation.slides[currentSlide.idx] = quesntionSlide;
    setNewPresentation(newPresenation);
  };
  const addSlide = (event: any) => {
    const newSlide: SlideDTO = {
      question: "",
      correct: "A",
      idx: newPresenation.slides.length,
      answers: [
        {
          id: "A",
          answer: "Answer A",
          placeHolder: `Option A`
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
  function changeSlide(event: any, idx: number) {
    const slideChange = newPresenation.slides[idx];
    setCurrentSlide(slideChange);
  }

  function resetIdx() {
    for (let i = 0; i < newPresenation.slides.length; i += 1) {
      newPresenation.slides[i].idx = i;
    }

    setNewPresentation(newPresenation);
  }
  function removeSlide(event: any) {
    if (currentSlide.idx === 0) {
      newPresenation.slides.splice(0, 1);
      setNewPresentation(newPresenation);
      resetIdx();
      setCurrentSlide(newPresenation.slides[0]);
    } else {
      setCurrentSlide(newPresenation.slides[currentSlide.idx - 1]);
      newPresenation.slides.splice(currentSlide.idx, 1);
      setNewPresentation(newPresenation);
      resetIdx();
    }
  }
  const setName = (event: any) => {
    setNewPresentation((presentation) => ({
      ...presentation,
      name: event.target.value
    }));
  };
  const settings = {
    vertical: true,
    verticalSwiping: true,
    arrows: false,
    swipeToSlide: true,
    slidesToShow: 5,
    slideToScroll: newPresenation.slides.length,
    infinite: false
  };
  return (
    <Container>
      <form>
        <Row>
          <Col lg={8}>
            <input
              {...register2("name", { required: true })}
              onChange={setName}
              placeholder="Enter Presentation Name"
              style={{ width: "inherit", height: "50px", fontSize: "34px" }}
            />
          </Col>
          <Col lg={4}>
            <Button variant="info" type="button" onClick={() => sendSlide()}>
              Save Presentation
            </Button>
          </Col>
        </Row>
      </form>

      <Button onClick={addSlide}>
        <FaPlus /> Add a new Slide
      </Button>
      <Row>
        <Col lg={1}>
          <Slider {...settings}>
            {newPresenation.slides.map((slide, idx) => (
              <Button
                className={
                  idx === currentSlide.idx ? "selected-slide" : "slide"
                }
                onClick={(e) => changeSlide(e, slide.idx)}
              >
                {idx + 1}
              </Button>
            ))}
          </Slider>
        </Col>

        <Col lg={8}>
          <Container className="slide-container" style={{ padding: "20px" }}>
            <Card>
              <Card.Body style={{ fontSize: "30px", margin: "20px" }}>
                Question:{currentSlide.question}
              </Card.Body>
            </Card>
            <Row xs={1} md={2} className="g-4" style={{ marginTop: "40px" }}>
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
        <Col lg={3}>
          <form onSubmit={handleSlide(onSubmit)}>
            <Container className="content-box">
              <Card>
                <Card.Body>
                  <Card.Header>Question</Card.Header>
                  <input
                    {...register("question", { required: true })}
                    onChange={setQuestion}
                  />
                  <Card.Header>Answer</Card.Header>
                  {currentSlide.answers.map((answer, idx) => (
                    <Row>
                      <Col lg={8}>
                        <input
                          {...register(`answers.${idx}.answer`)}
                          type="text"
                          placeholder={answer.placeHolder}
                          onChange={(e) => setAnswer(e, idx)}
                        />
                      </Col>
                    </Row>
                  ))}
                  <Select
                    options={currentSlide.answers.map((a) => ({
                      value: a.id,
                      label: a.placeHolder
                    }))}
                    onChange={(correct) => setCorrectAnswer(correct)}
                  />
                  <Row>
                    {currentSlide.answers.length < 4 && (
                      <Col lg={6}>
                        <Button
                          className="modify-btn"
                          variant="success"
                          onClick={addAnswer}
                        >
                          Add answer
                        </Button>
                      </Col>
                    )}
                    {currentSlide.answers.length > 1 && (
                      <Col lg={6}>
                        <Button
                          className="modify-btn"
                          variant="warning"
                          onClick={removeAnswer}
                        >
                          Remove answer
                        </Button>
                      </Col>
                    )}
                  </Row>
                </Card.Body>
              </Card>
              {newPresenation.slides.length > 1 && (
                <Row>
                  <Col lg={12}>
                    <Button
                      type="button"
                      variant="danger"
                      style={{ width: "inherit" }}
                      onClick={(e) => removeSlide(e)}
                    >
                      Remove Slide
                    </Button>
                  </Col>
                </Row>
              )}
            </Container>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
