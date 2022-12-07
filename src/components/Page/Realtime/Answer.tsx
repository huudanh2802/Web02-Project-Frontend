import React from "react";
import { Col, Button } from "react-bootstrap";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

function Answer({
  id,
  answer,
  question,
  game,
  socket,
  setAnswer,
  setSubmitted
}: {
  id: string;
  answer: string;
  question: number;
  game: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const submitAnswer = () => {
    socket.emit("submit_answer", { question, id, game });
    setAnswer(id);
    setSubmitted(true);
  };

  return (
    <Col className="pt-3" style={{ height: "100%" }}>
      <Button
        variant="outline-dark"
        style={{ width: "100%", height: "100%" }}
        onClick={() => submitAnswer()}
      >
        <h3 className="mt-2" style={{ fontWeight: "bold" }}>
          {id}. {answer}
        </h3>
      </Button>
    </Col>
  );
}

export default Answer;
