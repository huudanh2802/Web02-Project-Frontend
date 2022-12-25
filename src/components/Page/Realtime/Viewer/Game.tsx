import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import "react-toastify/dist/ReactToastify.css";
import { Socket } from "socket.io-client";
import { PresentationDTO, SlideDTO } from "../../../../dtos/PresentationDTO";
import { AnswerCounterDTO } from "../../../../dtos/GameDTO";
import { axiosPrivate } from "../../../../token/axiosPrivate";
import ChatBox from "../Components/Chat/ChatBox";
import QuestionBox from "../Components/Question/QuestionBox";
import "../Realtime.css";
import Body from "./Body";
import "../../../Common/Toast/ToastStyle.css";

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
  const [showAnswer, setShowAnswer] = useState(false);
  const [gameAnswer, setGameAnswer] = useState<AnswerCounterDTO[]>([
    {
      id: "A",
      count: 0
    },
    {
      id: "B",
      count: 0
    },
    {
      id: "C",
      count: 0
    },
    {
      id: "D",
      count: 0
    }
  ]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [bg, setBg] = useState("primary");

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
        setGameAnswer(data.answer);
        setShowAnswer(data.showAnswer);
        if (data.showAnswer) setBg("failed");
      }
    );

    return () => {
      socket.off("result_current_slide");
    };
  });

  useEffect(() => {
    socket.on("end_game", () => {
      toast("Host has ended the game", {
        className: "toast_container"
      });
      socket.emit("leave_game", { username, game });
      if (localStorage.getItem("fullname") === null) {
        navigate("/join");
      } else {
        navigate("/group/grouplist");
      }
    });

    socket.on("finish_game", () => {
      toast("Game has ended", {
        className: "toast_container"
      });
      socket.emit("leave_game", { username, game });
      if (localStorage.getItem("fullname") === null) {
        navigate("/join");
      } else {
        navigate("/group/grouplist");
      }
    });

    socket.on("disrupt_game", () => {
      // alert("Game is terminated since another is starting.");
      toast("Game is terminated since another is starting.", {
        className: "toast_container"
      });
      if (localStorage.getItem("fullname") === null) {
        navigate("/join");
      } else {
        navigate("/group/grouplist");
      }
    });

    return () => {
      socket.off("end_game");
      socket.off("finish_game");
      socket.off("disrupt_game");
    };
  }, [idx, presentation?.slides, socket, username, game, navigate]);

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

  return (
    <Container className={`game-container game-container-${bg}`} fluid>
      {loading && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <Body
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
      <QuestionBox
        username={username}
        userRole={loggedIn ? 1 : 2}
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

export default Game;
