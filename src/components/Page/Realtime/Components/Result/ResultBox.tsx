/* eslint-disable no-unused-vars */
import React from "react";
import { Col, Offcanvas, Row } from "react-bootstrap";

import { ResultItemDTO } from "../../../../../dtos/GameDTO";

import ResultFAB from "./ResultFAB";
import ResultBody from "./ResultBody";

import "../../Realtime.css";

function QuestionBox({
  showResult,
  handleShowResult,
  handleCloseResult,
  newResultCount,
  resultLog
}: {
  showResult: boolean;
  handleShowResult: () => void;
  handleCloseResult: () => void;
  newResultCount: number;
  resultLog: ResultItemDTO[];
}) {
  return (
    <>
      <Offcanvas show={showResult} onHide={handleCloseResult} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Result</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ height: "100vh" }}>
          <Col className="game-chatbox">
            <Row className="game-chat">
              <ResultBody resultLog={resultLog} />
            </Row>
          </Col>
        </Offcanvas.Body>
      </Offcanvas>
      <ResultFAB
        handleShowResult={handleShowResult}
        newResultCount={newResultCount}
      />
    </>
  );
}

export default QuestionBox;
