import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import Answer from "../Answer/Answer";

import PresentationDTO, { SlideDTO } from "../../../../../dtos/PresentationDTO";
import { AnswerCounterDTO } from "../../../../../dtos/GameDTO";

import "../../Realtime.css";

function Body({
  username,
  game,
  socket,
  presentation,
  setBg
}: {
  username: string;
  game: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  presentation: PresentationDTO | undefined;
  setBg: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [slide, setSlide] = useState<SlideDTO>();
  const [idx, setIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [answer, setAnswer] = useState("");
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
  const [showAnswer, setShowAnswer] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setSlide(presentation?.slides[idx]);
  }, [presentation?.slides, idx]);

  // Game-handling
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

    socket.on("end_game", () => {
      alert("Host has ended the game");
      socket.emit("leave_game", { username, game });
      if (localStorage.getItem("fullname") === null) {
        navigate("/join");
      } else {
        navigate("/group/grouplist");
      }
    });

    socket.on("finish_game", () => {
      alert("Game has ended");
      socket.emit("leave_game", { username, game });
      if (localStorage.getItem("fullname") === null) {
        navigate("/join");
      } else {
        navigate("/group/grouplist");
      }
    });

    socket.on("submit_answer", (data: { id: string }) => {
      const { id } = data;
      const cloneAnswer = [...gameAnswer];
      const answerIdx = cloneAnswer.findIndex((a) => a.id === id);
      cloneAnswer[answerIdx].count += 1;
      setGameAnswer(cloneAnswer);
    });

    return () => {
      socket.off("show_answer");
      socket.off("next_question");
      socket.off("end_game");
      socket.off("finish_game");
      socket.off("submit_answer");
    };
  }, [
    idx,
    presentation?.slides,
    socket,
    username,
    game,
    answer,
    setBg,
    slide,
    gameAnswer,
    navigate
  ]);

  return (
    <Col className="game-body">
      <Row className="mt-4 mb-4" style={{ textAlign: "center" }}>
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
                gameAnswer={gameAnswer}
                question={idx}
                game={game}
                socket={socket}
                setAnswer={setAnswer}
                setGameAnswer={setGameAnswer}
                setSubmitted={setSubmitted}
              />
            </Col>
          ))}
      </Row>
      <Row>
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
      </Row>
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
    </Col>
  );
}

export default Body;
