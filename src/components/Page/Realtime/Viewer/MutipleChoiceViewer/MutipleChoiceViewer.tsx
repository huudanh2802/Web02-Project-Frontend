import React, { useEffect, useState } from "react";
import { DefaultEventsMap } from "@socket.io/component-emitter";

import { Row, Col } from "react-bootstrap";
import { Socket } from "socket.io-client";
import {
  MutipleChoiceDTO,
  PresentationDTOV2,
  Slide
} from "../../../../../dtos/PresentationDTO";
import Answer from "./Answer";

export default function MutipleChoiceAnswer({
  slide,
  idx,
  socket,
  presentation,
  game,
  setIdx,
  setSlide
}: {
  slide: MutipleChoiceDTO;
  idx: number;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  presentation: PresentationDTOV2;
  game: string;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
  setSlide: React.Dispatch<React.SetStateAction<Slide>>;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  useEffect(() => {
    socket.on("show_answer", () => {
      setShowAnswer(true);
    });

    socket.on("next_question", () => {
      setIdx(idx + 1);
      setSlide(presentation?.slides[idx]);
      setShowAnswer(false);
      setAnswer("");
      setSubmitted(false);
    });
    return () => {
      socket.off("show_answer");
      socket.off("next_question");
    };
  }, [idx, presentation?.slides, setIdx, setSlide, socket]);

  return (
    <>
      <Row className="mt-4 mb-4" style={{ textAlign: "center" }}>
        <Col>
          <h1 style={{ fontWeight: "bold" }}>
            {idx + 1}. {slide?.question}
          </h1>
        </Col>
      </Row>
      <Row sm={1} md={2} lg={2}>
        {!submitted &&
          !showAnswer &&
          slide?.answers.map((a) => (
            <Col>
              <Answer
                id={a.id}
                answer={a.answer}
                question={idx}
                game={game}
                socket={socket}
                setAnswer={setAnswer}
                setSubmitted={setSubmitted}
              />
            </Col>
          ))}
      </Row>
      {submitted && !showAnswer && (
        <div style={{ textAlign: "center" }}>
          <h2>You have submitted your answer</h2>
        </div>
      )}
      {showAnswer && slide && answer !== slide.correct && answer !== "" && (
        <div style={{ textAlign: "center", color: "red" }}>
          <h2>Your answer is incorrect</h2>
        </div>
      )}
      {showAnswer && slide && answer !== slide.correct && answer === "" && (
        <div style={{ textAlign: "center", color: "red" }}>
          <h2>It is too late to answer</h2>
        </div>
      )}
      {showAnswer && slide && answer === slide.correct && (
        <div style={{ textAlign: "center", color: "green" }}>
          <h2>Your answer is correct</h2>
        </div>
      )}
    </>
  );
}
