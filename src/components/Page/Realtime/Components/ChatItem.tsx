import React from "react";
import { Card } from "react-bootstrap";
import moment from "moment";

import { ChatItemDTO } from "../../../../dtos/RealtimeDTO";

function ChatItem({ chat }: { chat: ChatItemDTO }) {
  const style = {
    marginBottom: "8px",
    borderColor: chat.own ? "#4bb8ad" : "black",
    backgroundColor: chat.own ? "#4bb8ad" : "white"
  };

  return (
    <Card style={style}>
      <header
        className="mt-2 fw-bold"
        style={{ color: chat.own ? "white" : "black" }}
      >
        {chat.username}
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
