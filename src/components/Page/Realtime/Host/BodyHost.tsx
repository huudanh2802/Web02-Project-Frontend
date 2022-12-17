import React from "react";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";
import { SlideDTO, PresentationDTO } from "../../../../dtos/PresentationDTO";
import HeadingHost from "./HeadingHost/HeadingHost";
import MutipleChoiceHost from "./MutipleChoiceHost/MutipleChoiceHost";
import ParagraphHost from "./ParaphaphHost/ParagraphHost";

export default function BodyHost({
  slide,
  idx,
  socket,
  presentation,
  game,
  setIdx,
  setSlide
}: {
  slide: SlideDTO;
  idx: number;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  presentation: PresentationDTO;
  game: string;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
  setSlide: React.Dispatch<React.SetStateAction<SlideDTO>>;
}) {
  switch (slide.type) {
    case 1: {
      return (
        <MutipleChoiceHost
          slide={slide}
          idx={idx}
          socket={socket}
          presentation={presentation!}
          game={game}
          setIdx={setIdx}
          setSlide={setSlide}
        />
      );
    }
    case 2: {
      return (
        <HeadingHost
          slide={slide}
          idx={idx}
          socket={socket}
          presentation={presentation!}
          game={game}
          setIdx={setIdx}
          setSlide={setSlide}
        />
      );
    }
    case 3: {
      return (
        <ParagraphHost
          slide={slide}
          idx={idx}
          socket={socket}
          presentation={presentation!}
          game={game}
          setIdx={setIdx}
          setSlide={setSlide}
        />
      );
    }
    default:
      return null;
  }
}
