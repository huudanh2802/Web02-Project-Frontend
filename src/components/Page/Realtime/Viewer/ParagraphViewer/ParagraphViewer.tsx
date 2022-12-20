import { DefaultEventsMap } from "@socket.io/component-emitter";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Socket } from "socket.io-client";
import {
  ParagraphDTO,
  PresentationDTO,
  SlideDTO
} from "../../../../../dtos/PresentationDTO";

export default function ParagraphViewer({
  slide,
  idx,
  socket,
  presentation,
  setIdx,
  setSlide
}: {
  slide: ParagraphDTO;
  idx: number;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  presentation: PresentationDTO;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
  setSlide: React.Dispatch<React.SetStateAction<SlideDTO>>;
}) {
  // Button handling

  useEffect(() => {
    socket.on("next_question", () => {
      setIdx(idx + 1);
      setSlide(presentation?.slides[idx]);
    });
    return () => {
      socket.off("next_question");
    };
  }, [idx, presentation?.slides, setIdx, setSlide, socket]);

  return (
    <Row className="mb-2" style={{ textAlign: "center" }}>
      <Col className="game-question">
        <h2 style={{ fontWeight: "bold" }}>{slide?.heading}</h2>
        <h3>{slide?.paragraph}</h3>
      </Col>
    </Row>
  );
}
