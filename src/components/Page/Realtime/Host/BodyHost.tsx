import React from "react";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Socket } from "socket.io-client";
import { SlideDTO, PresentationDTO } from "../../../../dtos/PresentationDTO";
import HeadingHost from "./HeadingHost/HeadingHost";
import MutipleChoiceHost from "./MutipleChoiceHost/MutipleChoiceHost";
import ParagraphHost from "./ParaphaphHost/ParagraphHost";
import { ResultItemDTO, AnswerCounterDTO } from "../../../../dtos/GameDTO";

export default function BodyHost({
  slide,
  idx,
  socket,
  presentation,
  game,
  setIdx,
  setSlide,
  result,
  setResult,
  newResultCount,
  setNewResultCount,
  answer,
  setAnswer,
  showAnswer,
  setShowAnswer
}: {
  slide: SlideDTO;
  idx: number;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  presentation: PresentationDTO;
  game: string;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
  setSlide: React.Dispatch<React.SetStateAction<SlideDTO>>;
  result: ResultItemDTO[];
  setResult: React.Dispatch<React.SetStateAction<ResultItemDTO[]>>;
  newResultCount: number;
  setNewResultCount: React.Dispatch<React.SetStateAction<number>>;
  answer: AnswerCounterDTO[];
  setAnswer: React.Dispatch<React.SetStateAction<AnswerCounterDTO[]>>;
  showAnswer: boolean;
  setShowAnswer: React.Dispatch<React.SetStateAction<boolean>>;
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
          result={result}
          setResult={setResult}
          newResultCount={newResultCount}
          setNewResultCount={setNewResultCount}
          answer={answer}
          setAnswer={setAnswer}
          showAnswer={showAnswer}
          setShowAnswer={setShowAnswer}
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
