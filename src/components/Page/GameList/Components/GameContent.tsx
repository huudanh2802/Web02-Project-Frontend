/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";

import ViewChatBox from "./Chat/ViewChatBox";
import ViewQuestionBox from "./Question/ViewQuestionBox";
import ViewResultBox from "./Result/ViewResultBox";

import GameDTO from "../../../../dtos/GameDTO";

function GameContent({ game }: { game: GameDTO | undefined }) {
  useEffect(() => {
    console.log(JSON.stringify(game));
  }, [game]);

  return (
    <Col>
      {game && (
        <Tabs defaultActiveKey="chat" className="mb-3">
          <Tab eventKey="chat" title="Chat">
            <ViewChatBox game={game} />
          </Tab>
          <Tab eventKey="question" title="Question">
            <ViewQuestionBox game={game} />
          </Tab>
          <Tab eventKey="result" title="Result">
            <ViewResultBox game={game} />
          </Tab>
        </Tabs>
      )}
    </Col>
  );
}

export default GameContent;
