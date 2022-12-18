/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import { PresentationDTO, SlideDTO } from "../../../../dtos/PresentationDTO";

import { axiosPrivate } from "../../../../token/axiosPrivate";
import ChatBox from "../Components/Chat/ChatBox";
import "../Realtime.css";
import BodyHost from "./BodyHost";
import "react-toastify/dist/ReactToastify.css";

function GameHost({
  socket,
  game
}: {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  game: string;
}) {
  const { presentationId } = useParams();
  const username = localStorage.getItem("fullname");
  const [newChatCount, setNewChatCount] = useState(0);

  // Chat box handling
  const [showChat, setShowChat] = useState(false);
  const handleShowChat = () => {
    setShowChat(true);
    setNewChatCount(0);
  };
  const handleCloseChat = () => setShowChat(false);
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
    })
      .then((response) => {
        setPresentation(response.data);
        setSlide(response.data.slides[idx]);
        console.log(response.data);
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      });
  }, [idx, presentationId]);

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
    </Container>
  );
}

export default GameHost;
