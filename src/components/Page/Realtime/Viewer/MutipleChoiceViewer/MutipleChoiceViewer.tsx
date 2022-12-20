import React, { useEffect, useState } from "react";
import { DefaultEventsMap } from "@socket.io/component-emitter";

import { Row, Col } from "react-bootstrap";
import { Socket } from "socket.io-client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import {
  MutipleChoiceDTO,
  PresentationDTO,
  SlideDTO
} from "../../../../../dtos/PresentationDTO";
import Answer from "./Answer";
import { AnswerCounterDTO } from "../../../../../dtos/GameDTO";
import "../../Realtime.css";

export default function MutipleChoiceAnswer({
  slide,
  idx,
  socket,
  presentation,
  game,
  username,
  setIdx,
  setSlide,
  setBg
}: {
  slide: MutipleChoiceDTO;
  idx: number;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  presentation: PresentationDTO;
  game: string;
  username: string;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
  setSlide: React.Dispatch<React.SetStateAction<SlideDTO>>;
  setBg: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameAnswer, setGameAnswer] = useState<AnswerCounterDTO[]>([
    {
      id: "A",
      count: 0
    },
    {
      id: "B",
      count: 0
    },
    {
      id: "C",
      count: 0
    },
    {
      id: "D",
      count: 0
    }
  ]);
  useEffect(() => {
    socket.on("show_answer", () => {
      setShowAnswer(true);
      if (slide && answer === slide.correct) {
        setBg("success");
      } else {
        setBg("failed");
      }
    });

    socket.on("next_question", () => {
      setIdx(idx + 1);
      setSlide(presentation?.slides[idx]);
      setShowAnswer(false);
      setGameAnswer([
        {
          id: "A",
          count: 0
        },
        {
          id: "B",
          count: 0
        },
        {
          id: "C",
          count: 0
        },
        {
          id: "D",
          count: 0
        }
      ]);
      setAnswer("");
      setSubmitted(false);
      setBg("primary");
    });
    return () => {
      socket.off("show_answer");
      socket.off("next_question");
    };
  }, [
    answer,
    idx,
    presentation?.slides,
    setBg,
    setIdx,
    setSlide,
    slide,
    socket
  ]);

  return (
    <>
      <Row className="mb-4" style={{ textAlign: "center" }}>
        <Col className="game-question">
          <h3 style={{ fontWeight: "bold" }}>
            {idx + 1}. {slide?.question}
          </h3>
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
                username={username}
                socket={socket}
                setAnswer={setAnswer}
                setSubmitted={setSubmitted}
                setGameAnswer={setGameAnswer}
                gameAnswer={gameAnswer}
              />
            </Col>
          ))}
      </Row>
      {submitted && !showAnswer && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>You have submitted your answer</h2>
        </div>
      )}
      {showAnswer && slide && answer !== slide.correct && answer !== "" && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>Your answer is incorrect</h2>
        </div>
      )}
      {showAnswer && slide && answer !== slide.correct && answer === "" && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>It is too late to answer</h2>
        </div>
      )}
      {showAnswer && slide && answer === slide.correct && (
        <div style={{ textAlign: "center", color: "white" }}>
          <h2>Your answer is correct</h2>
        </div>
      )}
      {(submitted || showAnswer) && (
        <Row>
          <Col style={{ textAlign: "center" }}>
            <div style={{ height: "95%", marginTop: "80px" }}>
              <ResponsiveContainer width="80%" height="80%">
                <BarChart style={{ marginLeft: "12%" }} data={gameAnswer}>
                  {gameAnswer.length > 0 && (
                    <XAxis dataKey="id" stroke="white" />
                  )}
                  {gameAnswer.length > 0 && (
                    <YAxis allowDecimals={false} stroke="white" />
                  )}
                  {gameAnswer.length > 0 && (
                    <Bar dataKey="count" fill="white" />
                  )}
                  {gameAnswer.length > 0 && (
                    <Tooltip itemStyle={{ color: "black" }} />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
}
