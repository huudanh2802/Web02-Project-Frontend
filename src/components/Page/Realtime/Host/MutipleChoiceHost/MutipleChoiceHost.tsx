/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-alert */

import { DefaultEventsMap } from "@socket.io/component-emitter";
import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";
import { Socket } from "socket.io-client";
import ResultBox from "../../Components/Result/ResultBox";
import {
  MutipleChoiceDTO,
  PresentationDTO,
  SlideDTO
} from "../../../../../dtos/PresentationDTO";
import { ResultItemDTO } from "../../../../../dtos/GameDTO";
import "../../Realtime.css";
import AnswerHost from "./AnswerHost";

interface AnswerCounter {
  id: string;
  count: number;
}
export default function MutipleChoiceHost({
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
  presentation: PresentationDTO;
  game: string;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
  setSlide: React.Dispatch<React.SetStateAction<SlideDTO>>;
}) {
  const answerTemplate = [
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
  ];
  const { presentationId } = useParams();

  const [answer, setAnswer] = useState<AnswerCounter[]>(answerTemplate);
  const [showAnswer, setShowAnswer] = useState(false);

  // Result box handling
  const [result, setResult] = useState<ResultItemDTO[]>([]);
  const [newResultCount, setNewResultCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const handleShowResult = () => {
    setShowResult(true);
    setNewResultCount(0);
  };
  const handleCloseResult = () => setShowResult(false);

  useEffect(() => {
    socket.on(
      "submit_answer",
      (data: {
        username: string;
        id: string;
        correct: boolean;
        createdAt: Date;
      }) => {
        const { username, id, correct, createdAt } = data;
        const checkArray = answer.filter((a) => a.id === id);
        if (checkArray.length === 0) {
          setAnswer((oldAnswer) => [...oldAnswer, { id, count: 1 }]);
        } else {
          const cloneAnswer = [...answer];
          const answerIdx = cloneAnswer.findIndex((a) => a.id === id);
          cloneAnswer[answerIdx].count += 1;
          setAnswer(cloneAnswer);

          setResult([
            ...result,
            {
              username,
              id,
              correct,
              createdAt
            }
          ]);

          setNewResultCount(newResultCount + 1);
        }
      }
    );

    return () => {
      socket.off("submit_answer");
    };
  }, [answer, socket, result, newResultCount]);

  // Button handling
  const handleShowAnswer = () => {
    setShowAnswer(true);
    socket.emit("show_answer", { game, slide });
  };
  const navigate = useNavigate();

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setAnswer(answerTemplate);
    setIdx(idx + 1);
    setSlide(presentation?.slides[idx]);
    setResult([]);
    socket.emit("next_question", { game, slide });
  };

  const handleFinishGame = () => {
    alert("End of presentation");
    socket.emit("finish_game", { game });
    navigate(`/group/presentation/${presentationId}`);
  };

  return (
    <>
      <Col>
        <Row className="mb-4" style={{ textAlign: "center" }}>
          <Col className="game-question">
            <h3 style={{ fontWeight: "bold" }}>
              {idx + 1}. {slide?.question}
            </h3>
          </Col>
        </Row>
        <Row sm={1} md={2} lg={2}>
          {slide?.answers.map((a) => (
            <Col>
              <AnswerHost
                id={a.id}
                answer={a.answer}
                correct={a.id === slide.correct}
                show={showAnswer}
              />
            </Col>
          ))}
        </Row>
        <Row>
          <Col style={{ textAlign: "center" }}>
            <div style={{ height: "95%", marginTop: "80px" }}>
              <ResponsiveContainer width="80%" height="70%">
                <BarChart style={{ marginLeft: "12%" }} data={answer}>
                  {answer.length > 0 && <XAxis dataKey="id" stroke="white" />}
                  {answer.length > 0 && (
                    <YAxis allowDecimals={false} stroke="white" />
                  )}
                  {answer.length > 0 && <Bar dataKey="count" fill="white" />}
                  {answer.length > 0 && (
                    <Tooltip itemStyle={{ color: "black" }} />
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
            {!showAnswer && (
              <Button variant="light" onClick={handleShowAnswer}>
                Show results
              </Button>
            )}
            {showAnswer &&
              presentation &&
              idx + 1 < presentation.slides.length && (
                <Button variant="light" onClick={handleNextQuestion}>
                  Next slide
                </Button>
              )}
            {showAnswer &&
              presentation &&
              idx + 1 >= presentation.slides.length && (
                <Button variant="light" onClick={handleFinishGame}>
                  Finish game
                </Button>
              )}
          </Col>
        </Row>
      </Col>
      <ResultBox
        showResult={showResult}
        handleShowResult={handleShowResult}
        handleCloseResult={handleCloseResult}
        newResultCount={newResultCount}
        resultLog={result}
      />
    </>
  );
}
