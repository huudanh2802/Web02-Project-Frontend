import { DefaultEventsMap } from "@socket.io/component-emitter";
import React from "react";
import { Socket } from "socket.io-client";
import { PresentationDTOV2, Slide } from "../../../../dtos/PresentationDTO";
import HeadingViewer from "./HeadingViewer/HeadingViewer";
import MutipleChoiceViewer from "./MutipleChoiceViewer/MutipleChoiceViewer";
import ParagraphViewer from "./ParagraphViewer/ParagraphViewer";

export default function SlideViewer({
  slide,
  idx,
  socket,
  presentation,
  game,
  setIdx,
  setSlide
}: {
  slide: Slide;
  idx: number;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  presentation: PresentationDTOV2;
  game: string;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
  setSlide: React.Dispatch<React.SetStateAction<Slide>>;
}) {
  switch (slide.type) {
    case 1: {
      return (
        <MutipleChoiceViewer
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
        <HeadingViewer
          slide={slide}
          idx={idx}
          socket={socket}
          presentation={presentation!}
          setIdx={setIdx}
          setSlide={setSlide}
        />
      );
    }
    case 3: {
      return (
        <ParagraphViewer
          slide={slide}
          idx={idx}
          socket={socket}
          presentation={presentation!}
          setIdx={setIdx}
          setSlide={setSlide}
        />
      );
    }
    default:
      return null;
  }
}
