/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React from "react";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import {
  MutipleChoiceDTO,
  PresentationDTOV2,
  Slide
} from "../../../../dtos/PresentationDTO";

import MutipleChoiceHost from "./MutipleChoiceHost/MutipleChoiceHost";
import { axiosPrivate } from "../../../../token/axiosPrivate";
import HeadingHost from "./HeadingHost/HeadingHost";
import ParagraphHost from "./ParaphaphHost/Paragraph.Host";
import SlideHost from "./SlideHost";

function GameHost({
  socket,
  game
}: {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  game: string;
}) {
  const { presentationId } = useParams();
  const [presentation, setPresentation] = useState<PresentationDTOV2>();
  const [slide, setSlide] = useState<Slide>({
    type: 1,
    question: "",
    idx: 0,
    correct: "A",
    answers: [
      {
        id: "A",
        answer: "Answer A",
        placeHolder: "A."
      }
    ]
  });
  const [idx, setIdx] = useState(0);

  // Game handling
  useEffect(() => {
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/game/get/${presentationId}`
    }).then((response) => {
      setPresentation(response.data);
      setSlide(response.data.slides[idx]);
      console.log(response.data);
    });
  }, [idx, presentationId]);

  return (
    <Container fluid>
      <SlideHost
        slide={slide}
        idx={idx}
        socket={socket}
        presentation={presentation!}
        game={game}
        setIdx={setIdx}
        setSlide={setSlide}
      />
    </Container>
  );
}

export default GameHost;
