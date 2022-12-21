/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { PresentationDTO, SlideDTO } from "../../../../dtos/PresentationDTO";

import { axiosPrivate } from "../../../../token/axiosPrivate";
import ChatBox from "../Components/Chat/ChatBox";
import QuestionBox from "../Components/Question/QuestionBox";
import "../Realtime.css";
import BodyHost from "./BodyHost";

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

  useEffect(() => {
    socket.on("disrupt_game", () => {
      alert("Your game is terminated since another is starting.");
      socket.emit("leave_game", { username, game });
      navigate("/group/grouplist");
    });

    return () => {
      socket.off("disrupt_game");
    };
  }, [idx, presentation?.slides, socket, username, game, navigate]);

  return (
    <Container className="game-container game-container-primary" fluid>
      <BodyHost
        slide={slide}
        idx={idx}
        socket={socket}
        presentation={presentation!}
        game={game}
        setIdx={setIdx}
        setSlide={setSlide}
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
    </Container>
  );
}

export default GameHost;
