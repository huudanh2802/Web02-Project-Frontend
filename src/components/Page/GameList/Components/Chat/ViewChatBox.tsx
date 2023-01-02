import React from "react";
import { Col, Row } from "react-bootstrap";

import ViewChatItem from "./ViewChatItem";

import GameDTO from "../../../../../dtos/GameDTO";

import "../../GameList.css";

function ViewChatBox({ game }: { game: GameDTO }) {
  return (
    <Col className="view-list">
      {game.chat.map((chat) => (
        <Row>
          <ViewChatItem chat={chat} />
        </Row>
      ))}
    </Col>
  );
}

export default ViewChatBox;
