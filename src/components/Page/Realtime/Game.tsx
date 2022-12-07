/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import Answer from "./Answer";
import PresentationDTO, { SlideDTO } from "../../../dtos/PresentationDTO";
import { axiosPrivate } from "../../../token/axiosPrivate";

function Game({
  username,
  game,
  socket
}: {
  username: string;
  game: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  const { presentationId, id } = useParams();
  const [presentation, setPresentation] = useState<PresentationDTO>();
  const [slide, setSlide] = useState<SlideDTO>();
  const [idx, setIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showAnswer, setShowAnswer] = useState(false);

  const navigate = useNavigate();

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

    return () => {
      socket.off("show_answer");
      socket.off("next_question");
      socket.off("end_game");
      socket.off("finish_game");
    };
  }, [idx, presentation?.slides, socket, username, game, navigate]);

  return (
    <Container fluid>
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
    </Container>
  );
}

export default Game;
