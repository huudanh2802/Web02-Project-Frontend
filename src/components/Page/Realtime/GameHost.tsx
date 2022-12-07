/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
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
import AnswerHost from "./AnswerHost";
import PresentationDTO, { SlideDTO } from "../../../dtos/PresentationDTO";
import { axiosPrivate } from "../../../token/axiosPrivate";

function GameHost({
  socket,
  game
}: {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  game: string;
}) {
  interface AnswerCounter {
    id: string;
    count: number;
  }

  const { presentationId } = useParams();
  const [presentation, setPresentation] = useState<PresentationDTO>();
  const [slide, setSlide] = useState<SlideDTO>();
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState<AnswerCounter[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const navigate = useNavigate();

  // Game handling
  useEffect(() => {
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/game/get/${presentationId}`
    }).then((response) => {
      setPresentation(response.data);
      setSlide(response.data.slides[idx]);
      console.log(response.data);
    });
  }, [idx, presentationId]);

  useEffect(() => {
    socket.on("submit_answer", (data: { id: string }) => {
      const { id } = data;
      const checkArray = answer.filter((a) => a.id === id);
      if (checkArray.length === 0) {
        setAnswer((oldAnswer) => [...oldAnswer, { id, count: 1 }]);
      } else {
        const cloneAnswer = [...answer];
        const answerIdx = cloneAnswer.findIndex((a) => a.id === id);
        cloneAnswer[answerIdx].count += 1;
        setAnswer(cloneAnswer);
      }
    });

    return () => {
      socket.off("submit_answer");
    };
  }, [answer, socket]);

  // Button handling
  const handleShowAnswer = () => {
    setShowAnswer(true);
    socket.emit("show_answer", { game, slide });
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setAnswer([]);
    setIdx(idx + 1);
    setSlide(presentation?.slides[idx]);
    socket.emit("next_question", { game, slide });
  };

  const handleFinishGame = () => {
    alert("End of presentation");
    socket.emit("finish_game", { game });
    navigate(`/group/presentation/${presentationId}`);
  };

  return (
    <Container fluid>
      <Row className="mt-2 mb-2" style={{ textAlign: "center" }}>
        <Col>
          <h1 style={{ fontWeight: "bold" }}>
            {idx + 1}. {slide?.question}
          </h1>
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
                {answer.length > 0 && <XAxis dataKey="id" />}
                {answer.length > 0 && <YAxis allowDecimals={false} />}
                {answer.length > 0 && <Tooltip />}
                {answer.length > 0 && <Bar dataKey="count" fill="#4bb8ad" />}
              </BarChart>
            </ResponsiveContainer>
          </div>
          {!showAnswer && (
            <Button variant="outline-dark" onClick={handleShowAnswer}>
              Show results
            </Button>
          )}
          {showAnswer &&
            presentation &&
            idx + 1 < presentation.slides.length && (
              <Button variant="primary" onClick={handleNextQuestion}>
                Next question
              </Button>
            )}
          {showAnswer &&
            presentation &&
            idx + 1 >= presentation.slides.length && (
              <Button variant="dark" onClick={handleFinishGame}>
                Finish game
              </Button>
            )}
        </Col>
      </Row>
    </Container>
  );
}

export default GameHost;
