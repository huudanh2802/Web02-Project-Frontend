import React, { useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";

import { ChatItemDTO } from "../../../../../dtos/RealtimeDTO";

import ChatItem from "./ChatItem";

function ChatBody({ chatHistory }: { chatHistory: ChatItemDTO[] }) {
  // Scroll to bottom
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  });
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [chatHistory]);

  return (
    <Col className="game-chat-list">
      {chatHistory.map((chat) => (
        <Row>
          <ChatItem chat={chat} />
        </Row>
      ))}
      <div ref={bottomRef} />
    </Col>
  );
}

export default ChatBody;
