/* eslint-disable no-alert */
import React from "react";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { Socket } from "socket.io-client";
import {
  HeadingDTO,
  PresentationDTO,
  SlideDTO
} from "../../../../../dtos/PresentationDTO";

export default function HeadingHost({
  slide,
  idx,
  socket,
  presentation,
  game,
  setIdx,
  setSlide
}: {
  slide: HeadingDTO;
  idx: number;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  presentation: PresentationDTO;
  game: string;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
  setSlide: React.Dispatch<React.SetStateAction<SlideDTO>>;
}) {
  const { presentationId, groupId } = useParams();

  // Button handling

  const navigate = useNavigate();

  const handleNextSlide = () => {
    setIdx(idx + 1);
    setSlide(presentation?.slides[idx]);
    socket.emit("next_question", { game, slide });
  };

  const handleFinishGame = () => {
    alert("End of presentation");
    socket.emit("finish_game", { game, groupId });
    navigate(`/group/presentation/${presentationId}`);
  };

  return (
    <Col>
      <Row className="mb-2" style={{ textAlign: "center" }}>
        <Col>
          <Col className="game-question">
            <h3 style={{ fontWeight: "bold" }}>{slide?.heading}</h3>
          </Col>{" "}
        </Col>
      </Row>
      <Row>
        <Col style={{ textAlign: "center" }}>
          {presentation && idx + 1 < presentation.slides.length && (
            <Button variant="light" onClick={handleNextSlide}>
              Next slide
            </Button>
          )}
          {presentation && idx + 1 >= presentation.slides.length && (
            <Button variant="dark" onClick={handleFinishGame}>
              Finish game
            </Button>
          )}
        </Col>
      </Row>
    </Col>
  );
}
