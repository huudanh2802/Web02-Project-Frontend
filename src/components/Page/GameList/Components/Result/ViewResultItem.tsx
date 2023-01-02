import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import moment from "moment";

import { ResultItemDTO } from "../../../../../dtos/GameDTO";

function ResultItem({ result }: { result: ResultItemDTO }) {
  const style = {
    marginBottom: "8px",
    borderColor: result.correct ? "yellowgreen" : "black",
    backgroundColor: result.correct ? "yellowgreen" : "white"
  };

  return (
    <Card style={style}>
      <Row className="align-items-center">
        <Col>
          <header
            className="mt-2 fw-bold"
            style={{
              color: result.correct ? "white" : "black",
              width: "fit-content",
              blockSize: "fit-content"
            }}
          >
            {result.username}{" "}
          </header>
          <p
            className="mb-2"
            style={{ color: result.correct ? "#dfe6f2" : "gray" }}
          >
            {moment(result.createdAt.toString()).format(
              "DD/MM/YYYY • hh:mm:ss"
            )}
          </p>
        </Col>
        <Col lg={3}>
          <div className="d-grid">
            {result.correct && (
              <Button
                variant="outline-light fw-bold"
                style={{ cursor: "default" }}
                active
              >
                {result.id}
              </Button>
            )}
            {!result.correct && (
              <Button
                variant="outline-dark fw-bold"
                style={{ cursor: "default" }}
                disabled
              >
                {result.id}
              </Button>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  );
}

export default ResultItem;
