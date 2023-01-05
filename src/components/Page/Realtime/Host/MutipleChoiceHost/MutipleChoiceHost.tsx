/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */

import { DefaultEventsMap } from "@socket.io/component-emitter";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../Common/Toast/ToastStyle.css";
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
import { ResultItemDTO, AnswerCounterDTO } from "../../../../../dtos/GameDTO";
import {
  MutipleChoiceDTO,
  PresentationDTO,
  SlideDTO
} from "../../../../../dtos/PresentationDTO";

import "../../Realtime.css";
import AnswerHost from "./AnswerHost";

function getAnswerTemplate(answerCount: number) {
  const answerTemplate = [];
  for (let i = 0; i < answerCount; i += 1) {
    answerTemplate.push({
      id: String.fromCharCode(65 + i),
      count: 0
    });
  }
  return answerTemplate;
}

export default function MutipleChoiceHost({
  slide,
  idx,
  socket,
  presentation,
  game,
  setIdx,
  setSlide,
  result,
  setResult,
  newResultCount,
  setNewResultCount,
  answer,
  setAnswer,
  showAnswer,
  setShowAnswer
}: {
  slide: MutipleChoiceDTO;
  idx: number;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  presentation: PresentationDTO;
  game: string;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
  setSlide: React.Dispatch<React.SetStateAction<SlideDTO>>;
  result: ResultItemDTO[];
  setResult: React.Dispatch<React.SetStateAction<ResultItemDTO[]>>;
  newResultCount: number;
  setNewResultCount: React.Dispatch<React.SetStateAction<number>>;
  answer: AnswerCounterDTO[];
  setAnswer: React.Dispatch<React.SetStateAction<AnswerCounterDTO[]>>;
  showAnswer: boolean;
  setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { groupId } = useParams();

  useEffect(() => {
    setAnswer(getAnswerTemplate(slide.answers.length));
  }, [slide.answers.length, slide, setAnswer]);

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

    socket.on("next_question", () => {
      setIdx(idx + 1);
      setSlide(presentation?.slides[idx]);
      setNewResultCount(0);
      setShowAnswer(false);
      setAnswer([]);
      setResult([]);
    });

    socket.on("show_answer", () => {
      setShowAnswer(true);
    });

    return () => {
      socket.off("submit_answer");
      socket.off("next_question");
      socket.off("show_answer");
    };
  }, [
    answer,
    socket,
    result,
    newResultCount,
    setResult,
    setNewResultCount,
    idx,
    presentation?.slides,
    setIdx,
    setSlide,
    setAnswer,
    setShowAnswer,
    slide.answers.length
  ]);

  // Button handling
  const handleShowAnswer = () => {
    setShowAnswer(true);
    socket.emit("show_answer", { game, slide });
  };
  const navigate = useNavigate();

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setIdx(idx + 1);
    setSlide(presentation?.slides[idx]);
    setAnswer([]);
    setResult([]);
    setNewResultCount(0);
    socket.emit("next_question", { game, slide });
  };

  const handleFinishGame = () => {
    // alert("End of presentation");
    toast("End of presentation", {
      className: "toast_container"
    });
    socket.emit("finish_game", { game, groupId });
    navigate(`/group/grouplist`);
  };

  useEffect(() => {
    socket.on("finish_game", () => {
      // alert("Game has ended");
      toast("Game has ended", {
        className: "toast_container"
      });
      socket.emit("leave_game", {
        username: localStorage.getItem("fullname"),
        game
      });
      if (localStorage.getItem("fullname") === null) {
        navigate("/join");
      } else {
        navigate("/group/grouplist");
      }
    });

    return () => {
      socket.off("finish_game");
    };
  }, [idx, presentation?.slides, setIdx, setSlide, socket, game, navigate]);

  return (
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
                {answer.length > 0 && (
                  <Tooltip itemStyle={{ color: "black" }} />
                )}
                {answer.length > 0 && <Bar dataKey="count" fill="white" />}
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
  );
}
