import React from "react";
import { Button } from "react-bootstrap";
import { FaComment } from "react-icons/fa";

import "../../Realtime.css";

function ChatFAB({
  handleShowChat,
  newChatCount
}: {
  handleShowChat: () => void;
  newChatCount: number;
}) {
  return (
    <>
      <Button className="fab fab-chat" variant="dark" onClick={handleShowChat}>
        <FaComment className="mb-2" />
      </Button>
      {newChatCount > 0 && (
        <span className="fab-noti fab-chat-noti">
          {newChatCount <= 9 ? newChatCount : "9+"}
        </span>
      )}
    </>
  );
}

export default ChatFAB;
