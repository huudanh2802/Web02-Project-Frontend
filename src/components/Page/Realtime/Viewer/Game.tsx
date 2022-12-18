/* eslint-disable no-alert */
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { ToastContainer, toast } from "react-toastify";
import { PresentationDTO, SlideDTO } from "../../../../dtos/PresentationDTO";
import { axiosPrivate } from "../../../../token/axiosPrivate";
import ChatBox from "../Components/Chat/ChatBox";
import "../Realtime.css";
import Body from "./Body";
import "react-toastify/dist/ReactToastify.css";

function Game({
  username,
  game,
  socket
}: {
  username: string;
  game: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  const { presentationId } = useParams();
  const loggedIn = localStorage.getItem("email") !== null;
  const [newChatCount, setNewChatCount] = useState(0);
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
  const navigate = useNavigate();

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

  useEffect(() => {
    socket.on("end_game", () => {
      alert("Host has ended the game");
      socket.emit("leave_game", { username, game });
      if (localStorage.getItem("fullname") === null) {
        navigate("/join");
      } else {
        navigate("/group/grouplist");
      }
    });

    socket.on("finish_game", () => {
      alert("Game has ended");
      socket.emit("leave_game", { username, game });
      if (localStorage.getItem("fullname") === null) {
        navigate("/join");
      } else {
        navigate("/group/grouplist");
      }
    });

    return () => {
      socket.off("end_game");
      socket.off("finish_game");
    };
  }, [idx, presentation?.slides, socket, username, game, navigate]);
  // Chat box handling
  const [showChat, setShowChat] = useState(false);
  const handleShowChat = () => {
    setShowChat(true);
    setNewChatCount(0);
  };
  const [bg, setBg] = useState("primary");

  const handleCloseChat = () => setShowChat(false);
  return (
    <>
      <ToastContainer />
      <Container className={`game-container game-container-${bg}`} fluid>
        <Body
          slide={slide}
          idx={idx}
          socket={socket}
          presentation={presentation!}
          game={game}
          setIdx={setIdx}
          setSlide={setSlide}
          setBg={setBg}
        />
        <ChatBox
          username={username}
          userRole={loggedIn ? 1 : 2}
          game={game}
          socket={socket}
          showChat={showChat}
          handleShowChat={handleShowChat}
          handleCloseChat={handleCloseChat}
          newChatCount={newChatCount}
          setNewChatCount={setNewChatCount}
        />
      </Container>
    </>
  );
}

export default Game;
