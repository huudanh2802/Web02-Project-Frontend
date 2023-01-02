import React from "react";
import { Col, Row } from "react-bootstrap";

import ViewQuestionItem from "./ViewQuestionItem";

import GameDTO from "../../../../../dtos/GameDTO";

import "../../GameList.css";

function ViewQuestionBox({ game }: { game: GameDTO }) {
  return (
    <Col className="view-list">
      {game.question.map((question) => (
        <Row>
          <ViewQuestionItem question={question} />
        </Row>
      ))}
    </Col>
  );
}

export default ViewQuestionBox;
