import React, { useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";

import { QuestionItemDTO } from "../../../../../dtos/GameDTO";

import QuestionItem from "./QuestionItem";

function QuestionBody({ questionLog }: { questionLog: QuestionItemDTO[] }) {
  // Scroll to bottom
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  });
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [questionLog]);

  return (
    <Col className="game-chat-list">
      {questionLog.map((question) => (
        <Row>
          <QuestionItem question={question} />
        </Row>
      ))}
      <div ref={bottomRef} />
    </Col>
  );
}

export default QuestionBody;
