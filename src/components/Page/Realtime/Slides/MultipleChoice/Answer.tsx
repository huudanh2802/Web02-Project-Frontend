import React from "react";
import { Col, Button } from "react-bootstrap";

function AnswerHost({ idx }: { idx: string }) {
  return (
    <Col>
      <Button
        variant="outline-dark"
        style={{ fontWeight: "bold", fontSize: "24px" }}
      >
        {idx}
      </Button>
    </Col>
  );
}

export default AnswerHost;
