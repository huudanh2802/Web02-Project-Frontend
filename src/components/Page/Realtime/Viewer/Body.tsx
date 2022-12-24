import { DefaultEventsMap } from "@socket.io/component-emitter";
import React from "react";
import { Socket } from "socket.io-client";
import { PresentationDTO, SlideDTO } from "../../../../dtos/PresentationDTO";
import { AnswerCounterDTO } from "../../../../dtos/GameDTO";
import HeadingViewer from "./HeadingViewer/HeadingViewer";
import MutipleChoiceViewer from "./MutipleChoiceViewer/MutipleChoiceViewer";
import ParagraphViewer from "./ParagraphViewer/ParagraphViewer";

export default function Body({
  slide,
  idx,
  socket,
  presentation,
  game,
  username,
  setIdx,
  setSlide,
  setBg,
  gameAnswer,
  setGameAnswer,
  showAnswer,
  setShowAnswer
}: {
  slide: SlideDTO;
  idx: number;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  presentation: PresentationDTO;
  game: string;
  username: string;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
  setSlide: React.Dispatch<React.SetStateAction<SlideDTO>>;
  setBg: React.Dispatch<React.SetStateAction<string>>;
  gameAnswer: AnswerCounterDTO[];
  setGameAnswer: React.Dispatch<React.SetStateAction<AnswerCounterDTO[]>>;
  showAnswer: boolean;
  setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>;
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
          username={username}
          setIdx={setIdx}
          setSlide={setSlide}
          setBg={setBg}
          gameAnswer={gameAnswer}
          setGameAnswer={setGameAnswer}
          showAnswer={showAnswer}
          setShowAnswer={setShowAnswer}
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
