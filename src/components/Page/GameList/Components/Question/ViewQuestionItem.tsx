/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Col,
  OverlayTrigger,
  Row,
  Tooltip
} from "react-bootstrap";
import moment from "moment";
import { FaArrowAltCircleUp } from "react-icons/fa";

import { QuestionItemDTO } from "../../../../../dtos/GameDTO";

function ViewQuestionItem({ question }: { question: QuestionItemDTO }) {
  // Role handling
  const [role, setRole] = useState("Host");
  const [tag, setTag] = useState("gold");

  useEffect(() => {
    switch (question.role) {
      case 1:
        setRole("Member");
        setTag("teal");
        break;
      case 2:
        setRole("Guest");
        setTag("gray");
        break;
      default:
        setRole("Host");
        setTag("gold");
    }
    if (question.own) setTag("own");
  }, [question.role, question.own]);

  const style = {
    marginBottom: "8px",
    borderColor: "black",
    backgroundColor: "white"
  };

  let headerColor = "gray";
  if (!question.answered) headerColor = "black";
  const headerStyle = {
    color: headerColor,
    width: "fit-content",
    blockSize: "fit-content"
  };

  let dateColor = "gray";
  if (!question.answered) dateColor = "gray";
  const dateStyle = {
    color: dateColor
  };

  let questionColor = "gray";
  if (!question.answered) questionColor = "black";
  const questionStyle = {
    color: questionColor
  };

  return (
    <Card style={style}>
      <Row className="align-items-center">
        <Col>
          <header className="mt-2 fw-bold" style={headerStyle}>
            {question.username}{" "}
            <span
              className={`tag tag-${question.answered ? "gray" : tag}`}
              style={{
                width: "fit-content",
                blockSize: "fit-content"
              }}
            >
              {role}
            </span>
          </header>
          <small style={dateStyle}>
            {moment(question.createdAt.toString()).format(
              "DD/MM/YYYY • hh:mm:ss"
            )}
          </small>
        </Col>
        <Col lg={3}>
          <div className="d-grid">
            <OverlayTrigger
              key="upvote"
              placement="top"
              overlay={<Tooltip>Upvote</Tooltip>}
            >
              <>
                {!question.answered && (
                  <Button
                    variant="outline-dark"
                    style={{ cursor: "default" }}
                    disabled
                  >
                    {question.vote} <FaArrowAltCircleUp className="mb-1" />
                  </Button>
                )}
                {question.answered && (
                  <Button
                    variant="primary"
                    style={{ cursor: "default" }}
                    disabled
                  >
                    {question.vote} <FaArrowAltCircleUp className="mb-1" />
                  </Button>
                )}
              </>
            </OverlayTrigger>
          </div>
        </Col>
      </Row>
      <Row>
        <p className="mb-2" style={questionStyle}>
          {question.question}
        </p>
      </Row>
      <Row className="mb-2">
        <div className="d-grid">
          {question.answered && (
            <Button variant="primary" style={{ cursor: "default" }} disabled>
              Answered
            </Button>
          )}
          {!question.answered && (
            <Button
              variant="outline-secondary"
              style={{ cursor: "default" }}
              disabled
            >
              Unanswered
            </Button>
          )}
        </div>
      </Row>
    </Card>
  );
}

export default ViewQuestionItem;
