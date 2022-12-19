/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";

import { QuestionItemDTO } from "../../../../../dtos/GameDTO";

import QuestionItem from "./QuestionItem";

function QuestionBody({
  questionLog,
  handleVote
}: {
  questionLog: QuestionItemDTO[];
  handleVote: (idx: number) => void;
}) {
  return (
    <Col className="game-chat-list">
      {questionLog.map((question) => (
        <Row>
          <QuestionItem question={question} handleVote={handleVote} />
        </Row>
      ))}
    </Col>
  );
}

export default QuestionBody;
