/* eslint-disable no-unused-vars */
import React from "react";
import { Col, Row } from "react-bootstrap";

import { ResultItemDTO } from "../../../../../dtos/GameDTO";

import ResultItem from "./ResultItem";

function ResultBody({ resultLog }: { resultLog: ResultItemDTO[] }) {
  return (
    <Col className="game-chat-list">
      {resultLog.map((result) => (
        <Row>
          <ResultItem result={result} />
        </Row>
      ))}
    </Col>
  );
}

export default ResultBody;
