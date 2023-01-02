import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import moment from "moment";

import GameDTO from "../../../../dtos/GameDTO";

import { axiosPrivate } from "../../../../token/axiosPrivate";

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
  // Role handling
  const [groupName, setGroupName] = useState("Public");
  const [tag, setTag] = useState("gold");

  useEffect(() => {
    if (game.groupId !== null) {
      axiosPrivate({
        method: "get",
        url: `${process.env.REACT_APP_API_SERVER}/group/get/${game.groupId}`
      }).then((response) => {
        setGroupName(response.data.name);
        setTag("teal");
      });
    }
  }, [game.groupId]);

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
        {game.game}{" "}
        <span
          className={`tag tag-${tag}`}
          style={{
            width: "fit-content",
            blockSize: "fit-content"
          }}
        >
          {groupName}
        </span>
      </header>
      <small style={{ color: selected ? "#dfe6f2" : "gray" }}>
        {moment(game.createdAt.toString()).format("DD/MM/YYYY • hh:mm:ss")}
      </small>
    </Card>
  );
}

export default GameItem;
