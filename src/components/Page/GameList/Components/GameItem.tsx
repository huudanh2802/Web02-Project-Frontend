import React from "react";
import { Card } from "react-bootstrap";
import moment from "moment";

import GameDTO from "../../../../dtos/GameDTO";

function GameItem({
  idx,
  game,
  selected,
  setCurGame
}: {
  idx: number;
  game: GameDTO;
  selected: boolean;
  setCurGame: React.Dispatch<React.SetStateAction<number>>;
}) {
  const style = {
    marginBottom: "8px",
    borderColor: selected ? "#4bb8ad" : "black",
    backgroundColor: selected ? "#4bb8ad" : "white",
    cursor: selected ? "default" : "pointer"
  };

  return (
    <Card style={style} onClick={() => setCurGame(idx)}>
      <header
        className="mt-2 fw-bold"
        style={{
          color: selected ? "white" : "black",
          width: "fit-content",
          blockSize: "fit-content"
        }}
      >
        {game.game}
      </header>
      <small style={{ color: selected ? "#dfe6f2" : "gray" }}>
        {moment(game.createdAt.toString()).format("DD/MM/YYYY • hh:mm:ss")}
      </small>
    </Card>
  );
}

export default GameItem;
