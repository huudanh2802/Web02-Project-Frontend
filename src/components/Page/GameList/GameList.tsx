/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

import GameBox from "./Components/GameBox";
import GameContent from "./Components/GameContent";

import GameDTO from "../../../dtos/GameDTO";

import { axiosPrivate } from "../../../token/axiosPrivate";

function GameList() {
  const { id } = useParams();
  const [gameList, setGameList] = useState<GameDTO[]>([]);
  const [curGameIdx, setCurGameIdx] = useState(-1);

  useEffect(() => {
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/game/getsession/${id}`
    }).then((response) => {
      setGameList(response.data);
    });
  }, [id]);

  return (
    <Container>
      <Row>
        <h1 className="page-title" style={{ marginBottom: "32px" }}>
          Game sessions
        </h1>
      </Row>
      <Row>
        <GameBox
          gameList={gameList}
          curGameIdx={curGameIdx}
          setCurGameIdx={setCurGameIdx}
        />
        <GameContent
          game={curGameIdx !== -1 ? gameList[curGameIdx] : undefined}
        />
      </Row>
    </Container>
  );
}

export default GameList;
