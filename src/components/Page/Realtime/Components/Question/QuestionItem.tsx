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

function QuestionItem({
  question,
  handleVote,
  handleAnswered,
  userRole
}: {
  question: QuestionItemDTO;
  handleVote: (idx: number) => void;
  handleAnswered: (idx: number) => void;
  userRole: number;
}) {
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
    borderColor: question.own ? "#4bb8ad" : "black",
    backgroundColor: question.own ? "#4bb8ad" : "white"
  };

  const answeredStyle = {
    marginBottom: "8px",
    borderColor: question.own ? "#4bb8ad" : "gray",
    backgroundColor: "white"
  };

  let headerColor = question.own ? "#4bb8ad" : "gray";
  if (!question.answered) headerColor = question.own ? "white" : "black";
  const headerStyle = {
    color: headerColor,
    width: "fit-content",
    blockSize: "fit-content"
  };

  let dateColor = "gray";
  if (!question.answered) dateColor = question.own ? "#dfe6f2" : "gray";
  const dateStyle = {
    color: dateColor
  };

  let questionColor = "gray";
  if (!question.answered) questionColor = question.own ? "white" : "black";
  const questionStyle = {
    color: questionColor
  };

  return (
    <Card style={question.answered ? answeredStyle : style}>
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
                {userRole === 0 && (
                  <Button
                    variant="outline-light"
                    style={{ cursor: "default" }}
                    active
                  >
                    {question.vote} <FaArrowAltCircleUp className="mb-1" />
                  </Button>
                )}
                {userRole !== 0 && !question.own && !question.answered && (
                  <Button
                    variant={`${question.voted ? "" : "outline-"}dark`}
                    onClick={() => handleVote(question.idx)}
                  >
                    {question.vote} <FaArrowAltCircleUp className="mb-1" />
                  </Button>
                )}
                {userRole !== 0 && !question.own && question.answered && (
                  <Button variant="secondary" disabled>
                    {question.vote} <FaArrowAltCircleUp className="mb-1" />
                  </Button>
                )}
                {userRole !== 0 && question.own && !question.answered && (
                  <Button
                    variant="outline-light"
                    style={{ cursor: "default" }}
                    active
                  >
                    {question.vote} <FaArrowAltCircleUp className="mb-1" />
                  </Button>
                )}
                {userRole !== 0 && question.own && question.answered && (
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
      {userRole === 0 && (
        <Row className="mb-2">
          <div className="d-grid">
            {!question.answered && (
              <Button
                variant="primary"
                onClick={() => handleAnswered(question.idx)}
              >
                Mark as answered
              </Button>
            )}
            {question.answered && (
              <Button
                variant="outline-secondary"
                style={{ cursor: "default" }}
                active
              >
                Answered
              </Button>
            )}
          </div>
        </Row>
      )}
    </Card>
  );
}

export default QuestionItem;
