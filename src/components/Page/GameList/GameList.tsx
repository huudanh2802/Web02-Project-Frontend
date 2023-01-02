/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

import GameDTO from "../../../dtos/GameDTO";

import { axiosPrivate } from "../../../token/axiosPrivate";

function GameList() {
  const { id } = useParams();
  const [game, setGame] = useState<GameDTO[]>([]);

  useEffect(() => {
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/game/getsession/${id}`
    }).then((response) => {
      setGame(response.data);
      console.log(response.data);
    });
  }, [id]);

  return (
    <Container>
      <Row>
        <h1 className="page-title" style={{ marginBottom: "32px" }}>
          Game sessions
        </h1>
      </Row>
    </Container>
  );
}

export default GameList;
