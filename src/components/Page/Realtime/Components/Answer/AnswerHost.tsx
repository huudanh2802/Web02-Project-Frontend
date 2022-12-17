/* eslint-disable no-unused-vars */
import React from "react";
import { Col, Button } from "react-bootstrap";

function AnswerHost({
  id,
  answer,
  correct,
  show
}: {
  id: string;
  answer: string;
  correct: boolean;
  show: boolean;
}) {
  return (
    <Col className="pt-2" style={{ height: "100%" }}>
      {!show && (
        <Button variant="light" style={{ width: "100%", height: "100%" }}>
          <h5 className="mt-2" style={{ fontWeight: "bold" }}>
            {id}. {answer}
          </h5>
        </Button>
      )}
      {show && correct && (
        <Button
          variant="outline-success"
          style={{ width: "100%", height: "100%" }}
          active
        >
          <h5 className="mt-2" style={{ fontWeight: "bold" }}>
            {id}. {answer}
          </h5>
        </Button>
      )}
      {show && !correct && (
        <Button
          variant="outline-light"
          style={{ width: "100%", height: "100%" }}
          disabled
        >
          <h5 className="mt-2" style={{ fontWeight: "bold" }}>
            {id}. {answer}
          </h5>
        </Button>
      )}
    </Col>
  );
}

export default AnswerHost;
