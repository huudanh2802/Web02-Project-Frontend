import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Row, Form } from "react-bootstrap";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

import { ChatItemDTO } from "../../../../dtos/RealtimeDTO";

import ChatItem from "./ChatItem";

import "../Realtime.css";

function ChatBox({
  username,
  game,
  socket
}: {
  username: string;
  game: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  // Chat textfield handling
  const [chatText, setChatText] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatItemDTO[]>([]);
  const { handleSubmit } = useForm();
  const onSubmit = () => {
    // Local handling
    const date = new Date();
    const role = localStorage.getItem("email") !== null ? 2 : 3;
    const tempChatHistory = [
      ...chatHistory,
      {
        username,
        chat: chatText,
        createdAt: date,
        own: true,
        role
      }
    ];
    setChatHistory(tempChatHistory);
    setChatText("");

    // Socket
    socket.emit("send_chat_msg", {
      username,
      chat: chatText,
      date,
      role,
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
    <Col className="game-chatbox" lg={3}>
      <Row>
        <h3 style={{ textAlign: "center", fontWeight: "bold" }}>Chat</h3>
      </Row>
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
          <Col lg={8}>
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
  );
}

export default ChatBox;
