import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import moment from "moment";

import { ChatItemDTO } from "../../../../../dtos/GameDTO";

function ChatItem({ chat }: { chat: ChatItemDTO }) {
  // Role handling
  const [role, setRole] = useState("Host");
  const [tag, setTag] = useState("gold");

  useEffect(() => {
    switch (chat.role) {
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
    if (chat.own) setTag("own");
  }, [chat.role, chat.own]);

  const style = {
    marginBottom: "8px",
    borderColor: chat.own ? "#4bb8ad" : "black",
    backgroundColor: chat.own ? "#4bb8ad" : "white"
  };

  return (
    <Card style={style}>
      <header
        className="mt-2 fw-bold"
        style={{
          color: chat.own ? "white" : "black",
          width: "fit-content",
          blockSize: "fit-content"
        }}
      >
        {chat.username}{" "}
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
      <small style={{ color: chat.own ? "#dfe6f2" : "gray" }}>
        {moment(chat.createdAt.toString()).format("DD/MM/YYYY • hh:mm:ss")}
      </small>
      <p className="mb-2" style={{ color: chat.own ? "white" : "black" }}>
        {chat.chat}
      </p>
    </Card>
  );
}

export default ChatItem;
