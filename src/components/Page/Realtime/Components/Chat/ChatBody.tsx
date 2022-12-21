import React, { useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";

import { ChatItemDTO } from "../../../../../dtos/GameDTO";

import ChatItem from "./ChatItem";

function ChatBody({ chatLog }: { chatLog: ChatItemDTO[] }) {
  // Scroll to bottom
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  });
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [chatLog]);

  return (
    <Col className="game-chat-list">
      {chatLog.map((chat) => (
        <Row>
          <ChatItem chat={chat} />
        </Row>
      ))}
      <div ref={bottomRef} />
    </Col>
  );
}

export default ChatBody;
