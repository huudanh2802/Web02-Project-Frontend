import { DefaultEventsMap } from "@socket.io/component-emitter";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { Socket } from "socket.io-client";
import {
  ParagraphDTO,
  PresentationDTOV2,
  Slide
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
  presentation: PresentationDTOV2;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
  setSlide: React.Dispatch<React.SetStateAction<Slide>>;
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
    <Row className="mt-2 mb-2" style={{ textAlign: "center" }}>
      <Col>
        <h1 style={{ fontWeight: "bold" }}>{slide?.heading}</h1>
        <h2>{slide?.paragraph}</h2>
      </Col>
    </Row>
  );
}
