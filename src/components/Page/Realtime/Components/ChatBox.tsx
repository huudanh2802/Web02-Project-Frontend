import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Row, Form } from "react-bootstrap";

import "../Realtime.css";

function ChatBox() {
  // Chat textfield handling
  const [chatText, setChatText] = useState("");
  const { handleSubmit } = useForm();
  const onSubmit = () => {
    alert(chatText);
    setChatText("");
  };

  return (
    <Col className="game-chatbox" lg={3}>
      <Row>
        <h3 style={{ textAlign: "center", fontWeight: "bold" }}>Chat</h3>
      </Row>
      <Row className="game-chat" />
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
