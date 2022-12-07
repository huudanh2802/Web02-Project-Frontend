/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import { useState, useMemo, useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaPlus } from "react-icons/fa";
import { useParams, useNavigate } from "react-router";
import Select from "react-select";
import Slider from "react-slick";
import PresentationDTO, { SlideDTO } from "../../../dtos/PresentationDTO";
import { nextChar } from "../../../helpers/functions";
import { axiosPrivate } from "../../../token/axiosPrivate";

export default function Presentation() {
  const { id } = useParams();
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
  const [detailPresentation, setPresentation] = useState<PresentationDTO>({
    name: "",
    groupId: "",
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
    console.log(result);
    if (result) {
      axiosPrivate({
        method: "put",
        url: `${process.env.REACT_APP_API_SERVER}/presentation/update/${id}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },

        data: detailPresentation
      }).then((response) => {
        alert("Presentation has been updated");
      });
    }
  }
  useEffect(() => {
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/presentation/get/${id}`
    })
      .then((response) => {
        console.log(response.data.slides[0]);
        setCurrentSlide(response.data.slides[0]);
        setPresentation(response.data);
      })
      .catch((err) => {
        alert(err);
        navigate("/");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (data: any) => {
    detailPresentation.slides[currentSlide.idx] = currentSlide;
    setPresentation(detailPresentation);
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
    detailPresentation.slides[currentSlide.idx] = newCurrentSlide;
    setPresentation(detailPresentation);
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
    detailPresentation.slides[currentSlide.idx] = newCurrentSlide;
    setPresentation(detailPresentation);
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
    detailPresentation.slides[currentSlide.idx] = newCurrentSlide;
    setPresentation(detailPresentation);
  };
  const setCorrectAnswer = (event: any) => {
    const correct = event.value;
    setCurrentSlide((slide) => ({
      ...slide,
      correct
    }));
    const newCurrentSlide = currentSlide;
    newCurrentSlide.correct = correct;
    detailPresentation.slides[currentSlide.idx] = newCurrentSlide;
    setPresentation(detailPresentation);
  };

  const setQuestion = (event: any) => {
    setCurrentSlide((slide) => ({
      ...slide,
      question: event.target.value
    }));
    const quesntionSlide = currentSlide;
    quesntionSlide.question = event.target.value;
    detailPresentation.slides[currentSlide.idx] = quesntionSlide;
    setPresentation(detailPresentation);
  };
  const addSlide = (event: any) => {
    const newSlide: SlideDTO = {
      question: "",
      correct: "A",
      idx: detailPresentation.slides.length,
      answers: [
        {
          id: "A",
          answer: "Answer A",
          placeHolder: `Option A`
        }
      ]
    };
    setPresentation((presentation) => ({
      ...presentation,
      slides: [...presentation.slides, newSlide]
    }));
    setCurrentSlide(newSlide);
    console.log(currentSlide);
  };
  function changeSlide(event: any, idx: number) {
    const slideChange = detailPresentation.slides[idx];
    setCurrentSlide(slideChange);
  }

  function resetIdx() {
    for (let i = 0; i < detailPresentation.slides.length; i += 1) {
      detailPresentation.slides[i].idx = i;
    }

    setPresentation(detailPresentation);
  }
  function removeSlide(event: any) {
    if (currentSlide.idx === 0) {
      detailPresentation.slides.splice(0, 1);
      setPresentation(detailPresentation);
      resetIdx();
      setCurrentSlide(detailPresentation.slides[0]);
    } else {
      setCurrentSlide(detailPresentation.slides[currentSlide.idx - 1]);
      detailPresentation.slides.splice(currentSlide.idx, 1);
      setPresentation(detailPresentation);
      resetIdx();
    }
  }
  const setName = (event: any) => {
    setPresentation((presentation) => ({
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
    slideToScroll: detailPresentation.slides.length,
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
              defaultValue={detailPresentation.name}
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
            {detailPresentation.slides.map((slide, idx) => (
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
                    defaultValue={currentSlide.question}
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
                          defaultValue={answer.answer}
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
              {detailPresentation.slides.length > 1 && (
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
