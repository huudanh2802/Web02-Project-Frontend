import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Offcanvas, Row, Form } from "react-bootstrap";
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
    const tempQuestionLog = [
      ...questionLog,
      {
        username,
        question: questionText,
        createdAt: date,
        own: true,
        role: userRole,
        answered: false,
        vote: 0
      }
    ];
    setQuestionLog(tempQuestionLog);
    setQuestionText("");

    // Socket
    socket.emit("send_question_msg", {
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
        username: string;
        question: string;
        role: number;
        date: Date;
      }) => {
        const { question, date, role } = data;
        const otherUsername = data.username;
        const tempQuestionLog = [
          ...questionLog,
          {
            username: otherUsername,
            question,
            createdAt: date,
            own: false,
            role,
            answered: false,
            vote: 0
          }
        ];
        setQuestionLog(tempQuestionLog);
        if (!showQuestion) setNewQuestionCount(newQuestionCount + 1);
      }
    );

    return () => {
      socket.off("receive_question_msg");
    };
  });

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
            <Row className="game-chat">
              <QuestionBody questionLog={questionLog} />
            </Row>
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
