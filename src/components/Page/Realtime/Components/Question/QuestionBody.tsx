/* eslint-disable no-unused-vars */
import React, { useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";

import { QuestionItemDTO } from "../../../../../dtos/GameDTO";

import QuestionItem from "./QuestionItem";

function QuestionBody({
  questionLog,
  handleVote,
  handleAnswered,
  userRole
}: {
  questionLog: QuestionItemDTO[];
  handleVote: (idx: number) => void;
  handleAnswered: (idx: number) => void;
  userRole: number;
}) {
  return (
    <Col className="game-chat-list">
      {questionLog.map((question) => (
        <Row>
          <QuestionItem
            question={question}
            handleVote={handleVote}
            handleAnswered={handleAnswered}
            userRole={userRole}
          />
        </Row>
      ))}
    </Col>
  );
}

export default QuestionBody;
