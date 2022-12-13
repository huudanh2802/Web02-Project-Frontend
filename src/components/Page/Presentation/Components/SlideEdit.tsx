/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from "react";
import { Col, Button, Form, InputGroup } from "react-bootstrap";
import {
  useForm,
  UseFormRegister,
  UseFormHandleSubmit,
  FieldValues
} from "react-hook-form";
import Select from "react-select";
import PresentationDTO, { SlideDTO } from "../../../../dtos/PresentationDTO";
import { nextChar } from "../../../../helpers/functions";

function SlideEdit({
  currentSlide,
  detailPresentation,
  setCurrentSlide,
  setPresentation,
  register,
  handleSlide
}: {
  currentSlide: SlideDTO;
  detailPresentation: PresentationDTO;
  setCurrentSlide: (event: any) => void;
  setPresentation: (value: React.SetStateAction<PresentationDTO>) => void;
  register: UseFormRegister<SlideDTO>;
  handleSlide: UseFormHandleSubmit<SlideDTO>;
}) {
  const onSubmit = () => {
    const tempPresentation = detailPresentation;
    tempPresentation.slides[currentSlide.idx] = currentSlide;
    setPresentation(tempPresentation);
  };

  const addAnswer = () => {
    const newCurrentSlide = structuredClone(currentSlide);

    setCurrentSlide((slide: any) => ({
      ...slide,
      answers: [
        ...slide.answers,
        {
          id: nextChar(slide.answers[slide.answers.length - 1]!.id),
          answer: `Answer ${nextChar(
            slide.answers[slide.answers.length - 1]!.id
          )}`,
          placeHolder: `${nextChar(
            slide.answers[slide.answers.length - 1]!.id
          )}.`
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
      placeHolder: `${nextChar(
        newCurrentSlide.answers[newCurrentSlide.answers.length - 1]!.id
      )}.`
    });
    const tempPresentation = detailPresentation;
    tempPresentation.slides[currentSlide.idx] = newCurrentSlide;
    setPresentation(tempPresentation);
  };

  const removeAnswer = (event: any) => {
    const updateAnswer = currentSlide.answers;
    updateAnswer.pop();
    setCurrentSlide((slide: any) => ({
      ...slide,
      answers: updateAnswer
    }));
    const newCurrentSlide = currentSlide;
    newCurrentSlide.answers = updateAnswer;
    const tempPresentation = detailPresentation;
    tempPresentation.slides[currentSlide.idx] = newCurrentSlide;
    setPresentation(tempPresentation);
  };

  const setAnswer = (event: any, idx: number) => {
    const updateAnswer = currentSlide.answers;
    updateAnswer[idx].answer = event.target.value;
    setCurrentSlide((slide: any) => ({
      ...slide,
      answers: updateAnswer
    }));
    const newCurrentSlide = currentSlide;
    newCurrentSlide.answers = updateAnswer;
    const tempPresentation = detailPresentation;
    tempPresentation.slides[currentSlide.idx] = newCurrentSlide;
    setPresentation(tempPresentation);
  };

  const setCorrectAnswer = (event: any) => {
    const correct = event.value;
    setCurrentSlide((slide: any) => ({
      ...slide,
      correct
    }));
    const newCurrentSlide = currentSlide;
    newCurrentSlide.correct = correct;
    const tempPresentation = detailPresentation;
    tempPresentation.slides[currentSlide.idx] = newCurrentSlide;
    setPresentation(tempPresentation);
  };

  const setQuestion = (event: any) => {
    setCurrentSlide((slide: any) => ({
      ...slide,
      question: event.target.value
    }));
    const questionSlide = currentSlide;
    questionSlide.question = event.target.value;
    const tempPresentation = detailPresentation;
    tempPresentation.slides[currentSlide.idx] = questionSlide;
    setPresentation(tempPresentation);
  };

  function resetIdx() {
    const tempPresentation = detailPresentation;
    setPresentation(tempPresentation);
    for (let i = 0; i < detailPresentation.slides.length; i += 1) {
      tempPresentation.slides[i].idx = i;
    }

    setPresentation(tempPresentation);
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

  return (
    <Col lg={3}>
      <Form id="slideEdit" onSubmit={handleSlide(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label style={{ fontWeight: "bold" }}>Question</Form.Label>
          <Form.Control
            type="question"
            placeholder={currentSlide.question}
            {...register("question")}
            onChange={setQuestion}
          />
        </Form.Group>
        <Form.Label style={{ fontWeight: "bold" }}>Answers</Form.Label>
        {currentSlide.answers.map((answer, idx) => (
          <InputGroup className="mb-2">
            <InputGroup.Text style={{ marginLeft: "0" }}>
              {String.fromCharCode(65 + idx)}
            </InputGroup.Text>
            <Form.Control
              type="answer"
              onChange={(e) => setAnswer(e, idx)}
              value={answer.answer}
              placeholder={answer.answer}
            />
          </InputGroup>
        ))}
        <div className="d-grid">
          {currentSlide.answers.length < 4 && (
            <Button className="mt-2" variant="primary" onClick={addAnswer}>
              Add answer
            </Button>
          )}
          {currentSlide.answers.length > 1 && (
            <Button className="mt-2" variant="danger" onClick={removeAnswer}>
              Remove answer
            </Button>
          )}
        </div>
        <Form.Label className="mt-4" style={{ fontWeight: "bold" }}>
          Correct answer
        </Form.Label>
        <Select
          placeholder={`${currentSlide.correct}. ${
            currentSlide.answers[currentSlide.correct.charCodeAt(0) - 65].answer
          }`}
          key={`${currentSlide.correct}. ${
            currentSlide.answers[currentSlide.correct.charCodeAt(0) - 65].answer
          }`}
          options={currentSlide.answers.map((a) => ({
            value: a.id,
            label: `${a.id}. ${a.answer}`
          }))}
          onChange={(correct: any) => setCorrectAnswer(correct)}
        />

        {detailPresentation.slides.length > 1 && (
          <>
            <Form.Label className="mt-3" style={{ fontWeight: "bold" }}>
              Slide options
            </Form.Label>
            <div className="d-grid">
              <Button
                className="mb-2"
                variant="danger"
                onClick={(e) => removeSlide(e)}
              >
                Remove slide
              </Button>
            </div>
          </>
        )}
      </Form>
    </Col>
  );
}

export default SlideEdit;
