import { DefaultEventsMap } from "@socket.io/component-emitter";
import React from "react";
import { Socket } from "socket.io-client";
import { PresentationDTO, SlideDTO } from "../../../../dtos/PresentationDTO";
import HeadingViewer from "./HeadingViewer/HeadingViewer";
import MutipleChoiceViewer from "./MutipleChoiceViewer/MutipleChoiceViewer";
import ParagraphViewer from "./ParagraphViewer/ParagraphViewer";

export default function Body({
  slide,
  idx,
  socket,
  presentation,
  game,
  setIdx,
  setSlide,
  setBg
}: {
  slide: SlideDTO;
  idx: number;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  presentation: PresentationDTO;
  game: string;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
  setSlide: React.Dispatch<React.SetStateAction<SlideDTO>>;
  setBg: React.Dispatch<React.SetStateAction<string>>;
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
          setBg={setBg}
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
