/* eslint-disable no-alert */
import { DefaultEventsMap } from "@socket.io/component-emitter";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { Socket } from "socket.io-client";
import {
  ParagraphDTO,
  PresentationDTO,
  SlideDTO
} from "../../../../../dtos/PresentationDTO";
import "../../Realtime.css";

export default function ParagraphHost({
  slide,
  idx,
  socket,
  presentation,
  game,
  setIdx,
  setSlide
}: {
  slide: ParagraphDTO;
  idx: number;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  presentation: PresentationDTO;
  game: string;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
  setSlide: React.Dispatch<React.SetStateAction<SlideDTO>>;
}) {
  const { presentationId } = useParams();

  // Button handling

  const navigate = useNavigate();

  const handleNextSlide = () => {
    setIdx(idx + 1);
    setSlide(presentation?.slides[idx]);
    socket.emit("next_question", { game, slide });
  };

  const handleFinishGame = () => {
    alert("End of presentation");
    socket.emit("finish_game", { game });
    navigate(`/group/presentation/${presentationId}`);
  };

  return (
    <Row className="mt-2 mb-2" style={{ textAlign: "center" }}>
      <Col className="game-question">
        <h2 style={{ fontWeight: "bold" }}>{slide?.heading}</h2>
        <h3>{slide?.paragraph}</h3>
      </Col>
      {presentation && idx + 1 < presentation.slides.length && (
        <Button variant="primary" onClick={handleNextSlide}>
          Next slide
        </Button>
      )}
      {presentation && idx + 1 >= presentation.slides.length && (
        <Button variant="dark" onClick={handleFinishGame}>
          Finish game
        </Button>
      )}
    </Row>
  );
}
