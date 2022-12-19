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
  handleVote
}: {
  question: QuestionItemDTO;
  handleVote: (idx: number) => void;
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

  return (
    <Card style={style}>
      <Row className="align-items-center">
        <Col>
          <header
            className="mt-2 fw-bold"
            style={{
              color: question.own ? "white" : "black",
              width: "fit-content",
              blockSize: "fit-content"
            }}
          >
            {question.username}{" "}
            <span
              className={`tag tag-${tag}`}
              style={{
                width: "fit-content",
                blockSize: "fit-content"
              }}
            >
              {role}
            </span>
          </header>
          <small style={{ color: question.own ? "#dfe6f2" : "gray" }}>
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
                {!question.own && (
                  <Button
                    variant={`${question.voted ? "" : "outline-"}dark`}
                    onClick={() => handleVote(question.idx)}
                  >
                    {question.vote} <FaArrowAltCircleUp className="mb-1" />
                  </Button>
                )}
                {question.own && (
                  <Button
                    variant="outline-light"
                    style={{ cursor: "default" }}
                    active
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
        <p className="mb-2" style={{ color: question.own ? "white" : "black" }}>
          {question.question}
        </p>
      </Row>
    </Card>
  );
}

export default QuestionItem;
