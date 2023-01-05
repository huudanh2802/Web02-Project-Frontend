/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { toast } from "react-toastify";
import { PresentationDTO, SlideDTO } from "../../../../dtos/PresentationDTO";

import { axiosPrivate } from "../../../../token/axiosPrivate";
import ChatBox from "../Components/Chat/ChatBox";
import QuestionBox from "../Components/Question/QuestionBox";
import ResultBox from "../Components/Result/ResultBox";
import "../Realtime.css";
import BodyHost from "./BodyHost";
import "react-toastify/dist/ReactToastify.css";
import "../../../Common/Toast/ToastStyle.css";
import { ResultItemDTO, AnswerCounterDTO } from "../../../../dtos/GameDTO";

function GameHost({
  socket,
  game
}: {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  game: string;
}) {
  const navigate = useNavigate();
  const { presentationId } = useParams();
  const username = localStorage.getItem("fullname");

  // Chat box handling
  const [newChatCount, setNewChatCount] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleShowChat = () => {
    setShowChat(true);
    setNewChatCount(0);
  };
  const handleCloseChat = () => setShowChat(false);

  // Question box handling
  const [newQuestionCount, setNewQuestionCount] = useState(0);
  const [showQuestion, setShowQuestion] = useState(false);
  const handleShowQuestion = () => {
    setShowQuestion(true);
    setNewQuestionCount(0);
  };
  const handleCloseQuestion = () => setShowQuestion(false);

  // Result box handling
  const [result, setResult] = useState<ResultItemDTO[]>([]);
  const [newResultCount, setNewResultCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const handleShowResult = () => {
    setShowResult(true);
    setNewResultCount(0);
  };
  const handleCloseResult = () => setShowResult(false);

  const [presentation, setPresentation] = useState<PresentationDTO>();
  const [slide, setSlide] = useState<SlideDTO>({
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
  const [answer, setAnswer] = useState<AnswerCounterDTO[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);

  // Game handling
  useEffect(() => {
    setLoading(true);
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/game/get/${presentationId}`
    })
      .then((response) => {
        setPresentation(response.data);
        setSlide(response.data.slides[idx]);
        console.log(response.data);
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      })
      .finally(() => setLoading(false));
  }, [idx, presentationId]);

  useEffect(() => {
    socket.emit("request_current_slide", { game });
  }, [game, socket]);

  useEffect(() => {
    socket.once(
      "result_current_slide",
      (data: {
        slide: number;
        answer: AnswerCounterDTO[];
        showAnswer: boolean;
      }) => {
        setIdx(data.slide);
        setAnswer(data.answer);
        setShowAnswer(data.showAnswer);
      }
    );

    return () => {
      socket.off("result_current_slide");
    };
  });

  useEffect(() => {
    socket.on("disrupt_game", () => {
      toast("Your game is terminated since another is starting.", {
        className: "toast_container"
      });
      socket.emit("leave_game", { username, game });
      navigate("/group/grouplist");
    });

    return () => {
      socket.off("disrupt_game");
    };
  }, [idx, presentation?.slides, socket, username, game, navigate]);

  return (
    <Container className="game-container game-container-primary" fluid>
      {loading && (
        <div className="spinner-background">
          <Spinner animation="border" variant="light" />
        </div>
      )}
      <BodyHost
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
      <ChatBox
        username={username!}
        userRole={0}
        game={game}
        socket={socket}
        showChat={showChat}
        handleShowChat={handleShowChat}
        handleCloseChat={handleCloseChat}
        newChatCount={newChatCount}
        setNewChatCount={setNewChatCount}
      />
      <QuestionBox
        username={username!}
        userRole={0}
        game={game}
        socket={socket}
        showQuestion={showQuestion}
        handleShowQuestion={handleShowQuestion}
        handleCloseQuestion={handleCloseQuestion}
        newQuestionCount={newQuestionCount}
        setNewQuestionCount={setNewQuestionCount}
      />
      {slide.type === 1 && (
        <ResultBox
          showResult={showResult}
          handleShowResult={handleShowResult}
          handleCloseResult={handleCloseResult}
          newResultCount={newResultCount}
          resultLog={result}
        />
      )}
    </Container>
  );
}

export default GameHost;
