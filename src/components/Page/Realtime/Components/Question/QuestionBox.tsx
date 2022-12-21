import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  ButtonGroup,
  Col,
  Offcanvas,
  Row,
  Form
} from "react-bootstrap";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

import { QuestionItemDTO } from "../../../../../dtos/GameDTO";

import QuestionFAB from "./QuestionFAB";
import QuestionBody from "./QuestionBody";

import "../../Realtime.css";

function QuestionBox({
  username,
  userRole,
  game,
  socket,
  showQuestion,
  handleShowQuestion,
  handleCloseQuestion,
  newQuestionCount,
  setNewQuestionCount
}: {
  username: string;
  userRole: number;
  game: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  showQuestion: boolean;
  handleShowQuestion: () => void;
  handleCloseQuestion: () => void;
  newQuestionCount: number;
  setNewQuestionCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  // Question textfield handling
  const [questionText, setQuestionText] = useState("");
  const [questionLog, setQuestionLog] = useState<QuestionItemDTO[]>([]);
  const { handleSubmit } = useForm();
  const onSubmit = () => {
    if (questionText.length <= 0) return;
    // Local handling
    const date = new Date();
    const idx = questionLog.length;
    const tempQuestionLog = [
      {
        idx,
        username,
        question: questionText,
        createdAt: date,
        own: true,
        role: userRole,
        answered: false,
        voted: false,
        vote: 0
      },
      ...questionLog
    ];
    setQuestionLog(tempQuestionLog);
    setQuestionText("");

    // Socket
    socket.emit("send_question_msg", {
      idx,
      username,
      question: questionText,
      date,
      role: userRole,
      game
    });
  };

  // Receiving questions from others
  useEffect(() => {
    socket.on(
      "receive_question_msg",
      (data: {
        idx: number;
        username: string;
        question: string;
        role: number;
        date: Date;
      }) => {
        const { idx, question, date, role } = data;
        const otherUsername = data.username;
        const tempQuestionLog = [
          {
            idx,
            username: otherUsername,
            question,
            createdAt: date,
            own: false,
            role,
            answered: false,
            voted: false,
            vote: 0
          },
          ...questionLog
        ];
        setQuestionLog(tempQuestionLog);
        if (!showQuestion) setNewQuestionCount(newQuestionCount + 1);
      }
    );

    return () => {
      socket.off("receive_question_msg");
    };
  });

  // Vote & answered handling
  function getSortedId(idx: number) {
    const sortedId = questionLog.findIndex((question) => question.idx === idx);
    console.log(sortedId);
    return sortedId;
  }

  function setSortedQuestionLog(
    sortedId: number,
    updatedQuestion: QuestionItemDTO
  ) {
    setQuestionLog([
      ...questionLog.slice(0, sortedId),
      updatedQuestion,
      ...questionLog.slice(sortedId + 1)
    ]);
  }

  const handleVote = (idx: number) => {
    const sortedId = getSortedId(idx);
    socket.emit(`send_${questionLog[sortedId].voted ? "un" : ""}vote`, {
      idx,
      game
    });

    const updatedQuestion = questionLog[sortedId];
    updatedQuestion.vote += updatedQuestion.voted ? -1 : 1;
    updatedQuestion.voted = !updatedQuestion.voted;
    setSortedQuestionLog(sortedId, updatedQuestion);
  };

  const handleAnswered = (idx: number) => {
    const sortedId = getSortedId(idx);
    socket.emit("send_answered", { idx, game });

    const updatedQuestion = questionLog[sortedId];
    updatedQuestion.answered = true;
    setSortedQuestionLog(sortedId, updatedQuestion);
  };

  useEffect(() => {
    socket.on("receive_vote", (data: { idx: number }) => {
      const { idx } = data;
      const sortedId = getSortedId(idx);
      const updatedQuestion = questionLog[sortedId];
      updatedQuestion.vote += 1;
      setSortedQuestionLog(sortedId, updatedQuestion);
    });
    socket.on("receive_unvote", (data: { idx: number }) => {
      const { idx } = data;
      const sortedId = getSortedId(idx);
      const updatedQuestion = questionLog[sortedId];
      updatedQuestion.vote -= 1;
      setSortedQuestionLog(sortedId, updatedQuestion);
    });
    socket.on("receive_answered", (data: { idx: number }) => {
      const { idx } = data;
      const sortedId = getSortedId(idx);
      const updatedQuestion = questionLog[sortedId];
      updatedQuestion.answered = true;
      setSortedQuestionLog(sortedId, updatedQuestion);
    });

    return () => {
      socket.off("receive_vote");
      socket.off("receive_unvote");
      socket.off("receive_answered");
    };
  });

  // Sort handling
  const sortTypeName = ["Most recent", "Unanswered", "Most voted"];
  const [sortType, setSortType] = useState(0);
  const handleSort = (idx: number) => {
    setSortType(idx);
    const sortedQuestionLog = questionLog;
    sortedQuestionLog.sort((a: QuestionItemDTO, b: QuestionItemDTO) => {
      switch (idx) {
        case 0: // Most recent
          if (a.idx < b.idx) return 1;
          if (a.idx > b.idx) return -1;
          break;
        case 1: // Answered
          if (Number(a.answered) < Number(b.answered)) return -1;
          if (Number(a.answered) > Number(b.answered)) return 1;
          break;
        case 2: // Most votes
          if (a.vote < b.vote) return 1;
          if (a.vote > b.vote) return -1;
          break;
        default:
          return 0;
      }
      return 0;
    });
    setQuestionLog(sortedQuestionLog);
  };

  return (
    <>
      <Offcanvas
        show={showQuestion}
        onHide={handleCloseQuestion}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Questions</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ height: "100vh" }}>
          <Col className="game-chatbox">
            <ButtonGroup>
              {sortTypeName.map((type, idx) => (
                <>
                  {idx === sortType && (
                    <Button
                      variant="outline-dark"
                      style={{ cursor: "default" }}
                      active
                    >
                      {type}
                    </Button>
                  )}
                  {idx !== sortType && (
                    <Button
                      variant="outline-dark"
                      onClick={() => handleSort(idx)}
                    >
                      {type}
                    </Button>
                  )}
                </>
              ))}
            </ButtonGroup>
            <Row
              className="game-question mt-3"
              style={{ height: `${userRole === 0 ? "87" : "82"}%` }}
            >
              <QuestionBody
                questionLog={questionLog}
                handleVote={handleVote}
                handleAnswered={handleAnswered}
                userRole={userRole}
              />
            </Row>
            {userRole !== 0 && (
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row style={{ marginTop: "16px" }}>
                  <Col lg={9}>
                    <Form.Control
                      onChange={(e) => setQuestionText(e.target.value)}
                      value={questionText}
                    />
                  </Col>
                  <Col>
                    <div className="d-grid">
                      <Button type="submit">Send</Button>
                    </div>
                  </Col>
                </Row>
              </Form>
            )}
          </Col>
        </Offcanvas.Body>
      </Offcanvas>
      <QuestionFAB
        handleShowQuestion={handleShowQuestion}
        newQuestionCount={newQuestionCount}
      />
    </>
  );
}

export default QuestionBox;
