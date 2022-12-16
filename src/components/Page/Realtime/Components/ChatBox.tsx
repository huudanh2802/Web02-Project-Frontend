import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Offcanvas, Row, Form } from "react-bootstrap";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

import { ChatItemDTO } from "../../../../dtos/RealtimeDTO";

import ChatItem from "./ChatItem";

import "../Realtime.css";

function ChatBox({
  username,
  userRole,
  game,
  socket,
  showChat,
  handleCloseChat
}: {
  username: string;
  userRole: number;
  game: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  showChat: boolean;
  handleCloseChat: () => void;
}) {
  // Chat textfield handling
  const [chatText, setChatText] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatItemDTO[]>([]);
  const { handleSubmit } = useForm();
  const onSubmit = () => {
    if (chatText.length <= 0) return;
    // Local handling
    const date = new Date();
    const tempChatHistory = [
      ...chatHistory,
      {
        username,
        chat: chatText,
        createdAt: date,
        own: true,
        role: userRole
      }
    ];
    setChatHistory(tempChatHistory);
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
        const tempChatHistory = [
          ...chatHistory,
          {
            username: otherUsername,
            chat,
            createdAt: date,
            own: false,
            role
          }
        ];
        setChatHistory(tempChatHistory);
      }
    );
  });

  // Scroll to bottom
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [chatHistory]);

  return (
    <Offcanvas show={showChat} onHide={handleCloseChat} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Chat</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ height: "100vh" }}>
        <Col className="game-chatbox">
          <Row className="game-chat">
            <Col className="game-chat-list">
              {chatHistory.map((chat) => (
                <Row>
                  <ChatItem chat={chat} />
                </Row>
              ))}
              <div ref={bottomRef} />
            </Col>
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
  );
}

export default ChatBox;
