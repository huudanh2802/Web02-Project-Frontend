import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import moment from "moment";

import { QuestionItemDTO } from "../../../../../dtos/GameDTO";

function QuestionItem({ question }: { question: QuestionItemDTO }) {
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
        {moment(question.createdAt.toString()).format("DD/MM/YYYY • hh:mm:ss")}
      </small>
      <p className="mb-2" style={{ color: question.own ? "white" : "black" }}>
        {question.question}
      </p>
    </Card>
  );
}

export default QuestionItem;
