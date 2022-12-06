import React from "react";
import { Col, Button } from "react-bootstrap";

function AnswerHost({ idx, answer }: { idx: string; answer: string }) {
  return (
    <Col>
      <Button variant="outline-dark" style={{ fontWeight: "bold" }}>
        {idx}. {answer}
      </Button>
    </Col>
  );
}

export default AnswerHost;
