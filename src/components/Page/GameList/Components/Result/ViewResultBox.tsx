import React, { useState } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";

import ViewResultItem from "./ViewResultItem";

import GameDTO from "../../../../../dtos/GameDTO";

import "../../GameList.css";

function ViewResultBox({ game }: { game: GameDTO }) {
  const [questionIdx, setQuestionIdx] = useState(0);

  return (
    <>
      <Col className="view-result-button-group">
        <ButtonGroup>
          {game.result.map((result, idx) => (
            <>
              {questionIdx === idx && (
                <Button variant="outline-dark" active>
                  {result.question}
                </Button>
              )}
              {questionIdx !== idx && (
                <Button
                  variant="outline-dark"
                  onClick={() => setQuestionIdx(idx)}
                >
                  {result.question}
                </Button>
              )}
            </>
          ))}
        </ButtonGroup>
      </Col>
      <Col className="view-list">
        {game.result[questionIdx].result.map((result) => (
          <Row>
            <ViewResultItem result={result} />
          </Row>
        ))}
      </Col>
    </>
  );
}

export default ViewResultBox;
