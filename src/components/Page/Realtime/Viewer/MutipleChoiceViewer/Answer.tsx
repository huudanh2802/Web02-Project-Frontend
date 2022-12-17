import React from "react";
import { Col, Button } from "react-bootstrap";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { AnswerCounterDTO } from "../../../../../dtos/GameDTO";

function Answer({
  id,
  answer,
  question,
  gameAnswer,
  game,
  socket,
  setAnswer,
  setGameAnswer,
  setSubmitted
}: {
  id: string;
  answer: string;
  gameAnswer: AnswerCounterDTO[];
  question: number;
  game: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  setGameAnswer: React.Dispatch<React.SetStateAction<AnswerCounterDTO[]>>;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const submitAnswer = () => {
    socket.emit("submit_answer", { question, id, game });
    setAnswer(id);
    setSubmitted(true);
    const cloneAnswer = [...gameAnswer];
    const answerIdx = cloneAnswer.findIndex((a) => a.id === id);
    cloneAnswer[answerIdx].count += 1;
    setGameAnswer(cloneAnswer);
  };

  return (
    <Col className="pt-3" style={{ height: "100%" }}>
      <Button
        variant="light"
        style={{ width: "100%", height: "100%" }}
        onClick={() => submitAnswer()}
      >
        <h5 className="mt-2" style={{ fontWeight: "bold" }}>
          {id}. {answer}
        </h5>
      </Button>
    </Col>
  );
}

export default Answer;
