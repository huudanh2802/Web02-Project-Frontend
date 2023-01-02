import React from "react";
import { Col, Row } from "react-bootstrap";

import GameItem from "./GameItem";

import GameDTO from "../../../../dtos/GameDTO";

import "../GameList.css";

function GameBox({
  gameList,
  curGameIdx,
  setCurGameIdx
}: {
  gameList: GameDTO[];
  curGameIdx: number;
  setCurGameIdx: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <Col lg={3} className="game-list">
      {gameList.map((game, idx) => (
        <Row>
          <GameItem
            idx={idx}
            game={game}
            selected={curGameIdx === idx}
            setCurGame={setCurGameIdx}
          />
        </Row>
      ))}
    </Col>
  );
}

export default GameBox;
