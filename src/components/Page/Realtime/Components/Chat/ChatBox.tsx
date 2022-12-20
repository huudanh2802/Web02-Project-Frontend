import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Offcanvas, Row, Form } from "react-bootstrap";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

import { ChatItemDTO } from "../../../../../dtos/GameDTO";

import ChatFAB from "./ChatFAB";
import ChatBody from "./ChatBody";

import "../../Realtime.css";

function ChatBox({
  username,
  userRole,
  game,
  socket,
  showChat,
  handleShowChat,
  handleCloseChat,
  newChatCount,
  setNewChatCount
}: {
  username: string;
  userRole: number;
  game: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  showChat: boolean;
  handleShowChat: () => void;
  handleCloseChat: () => void;
  newChatCount: number;
  setNewChatCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  // Chat textfield handling
  const [chatText, setChatText] = useState("");
  const [chatLog, setChatLog] = useState<ChatItemDTO[]>([]);
  const { handleSubmit } = useForm();
  const onSubmit = () => {
    if (chatText.length <= 0) return;
    // Local handling
    const date = new Date();
    const tempChatLog = [
      ...chatLog,
      {
        username,
        chat: chatText,
        createdAt: date,
        own: true,
        role: userRole
      }
    ];
    setChatLog(tempChatLog);
    setChatText("");

    // Socket
    socket.emit("send_chat_msg", {
      username,
      chat: chatText,
      date,
      role: userRole,
      game
    });
  };

  // Receiving messages from others
  useEffect(() => {
    socket.on(
      "receive_chat_msg",
      (data: { username: string; chat: string; role: number; date: Date }) => {
        const { chat, date, role } = data;
        const otherUsername = data.username;
        const tempChatLog = [
          ...chatLog,
          {
            username: otherUsername,
            chat,
            createdAt: date,
            own: false,
            role
          }
        ];
        setChatLog(tempChatLog);
        if (!showChat) setNewChatCount(newChatCount + 1);
      }
    );

    return () => {
      socket.off("receive_chat_msg");
    };
  });

  return (
    <>
      <Offcanvas show={showChat} onHide={handleCloseChat} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Chat</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ height: "100vh" }}>
          <Col className="game-chatbox">
            <Row className="game-chat">
              <ChatBody chatLog={chatLog} />
            </Row>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row style={{ marginTop: "16px" }}>
                <Col lg={9}>
                  <Form.Control
                    onChange={(e) => setChatText(e.target.value)}
                    value={chatText}
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
      <ChatFAB handleShowChat={handleShowChat} newChatCount={newChatCount} />
    </>
  );
}

export default ChatBox;
