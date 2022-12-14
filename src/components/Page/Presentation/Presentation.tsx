/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import {
  HeadingDTO,
  MutipleChoiceDTO,
  ParagraphDTO,
  PresentationDTO,
  SlideDTO
} from "../../../dtos/PresentationDTO";
import { axiosPrivate } from "../../../token/axiosPrivate";

import Body from "./Components/Body";
import SlideBar from "./Components/SlideBar";
import SlideEdit from "./Components/SlideEdit";
import TopBar from "./Components/TopBar";

import "./Presentation.css";
import "../../Common/Toast/ToastStyle.css";

function Presentation({
  setGame,
  socket
}: {
  setGame: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  const { id } = useParams();
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState<SlideDTO>({
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

  const [checkOwn, setOwn] = useState(false);
  const [detailPresentation, setPresentation] = useState<PresentationDTO>({
    name: "",
    creator: "",
    slides: [currentSlide]
  });

  const {
    register: registerName,
    trigger,
    handleSubmit: handleSubmitName,
    formState: { errors: errorsName }
  } = useForm();

  async function sendSlide() {
    setLoading(true);
    axiosPrivate({
      method: "put",
      url: `${process.env.REACT_APP_API_SERVER}/presentation/update/${id}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },

      data: detailPresentation
    })
      .then((response) => {
        toast.success("Presentation has been updated", {
          className: "toast_container"
        });
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      })
      .finally(() => setLoading(false));
  }

  function checkAutho() {
    axiosPrivate({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/presentation/checkautho/${id}`,
      data: { userId }
    })
      .then(() => {})
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
        navigate("/");
      })

      .finally(() => setLoading(false));
  }
  useEffect(() => {
    setLoading(true);
    checkAutho();
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/presentation/get/${id}`
    })
      .then((response) => {
        setCurrentSlide(response.data.slides[0]);
        setPresentation(response.data);
        if (response.data.creator === userId) {
          setOwn(true);
        }
      })
      .catch((err) => {
        toast.error(err, {
          className: "toast_container"
        });
        setTimeout(() => {
          navigate("/");
        }, 2500);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addMutipleChoice = (event: any) => {
    const newSlide: MutipleChoiceDTO = {
      type: 1,
      question: "",
      correct: "A",
      idx: detailPresentation.slides.length,
      answers: [
        {
          id: "A",
          answer: "Answer A",
          placeHolder: "A."
        }
      ]
    };
    setPresentation((presentation) => ({
      ...presentation,
      slides: [...presentation.slides, newSlide]
    }));
    setCurrentSlide(newSlide);
  };

  const addHeading = (event: any) => {
    const newSlide: HeadingDTO = {
      idx: detailPresentation.slides.length,
      type: 2,
      heading: ""
    };
    setPresentation((presentation) => ({
      ...presentation,
      slides: [...presentation.slides, newSlide]
    }));
    setCurrentSlide(newSlide);
  };

  const addParagraph = (event: any) => {
    const newSlide: ParagraphDTO = {
      type: 3,
      idx: detailPresentation.slides.length,

      heading: "",
      paragraph: ""
    };
    setPresentation((presentation) => ({
      ...presentation,
      slides: [...presentation.slides, newSlide]
    }));
    setCurrentSlide(newSlide);
  };

  const changeSlide = (idx: number) => {
    const slideChange = detailPresentation.slides[idx];
    setCurrentSlide(slideChange);
  };

  const viewGames = () => {
    navigate(`/group/gamelist/${id}`);
  };

  const present = () => {
    const game = Math.floor(Math.random() * 10000);
    // Backend
    setLoading(true);
    axiosPrivate({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/game/newgame/`,
      data: { game, presentationId: id }
    })
      .then((response) => {
        console.log(`Game ${game} created successfully.`);
        setGame(game.toString());
        socket.emit("create_game", {
          game: game.toString(),
          presentation: id,
          group: null
        });
        navigate(`/lobbyhost/${id}/${game}`);
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Container fluid>
      {loading && (
        <div className="spinner-background">
          <Spinner animation="border" variant="light" />
        </div>
      )}
      <TopBar
        sendSlide={() => sendSlide()}
        viewGames={viewGames}
        present={present}
        detailPresentation={detailPresentation}
        setPresentation={setPresentation}
        registerName={registerName}
        handleSubmitName={handleSubmitName}
        checkOwn={checkOwn}
      />
      <Row className="mt-2">
        <SlideBar
          addMutipleChoice={addMutipleChoice}
          addHeading={addHeading}
          addParagraph={addParagraph}
          detailPresentation={detailPresentation}
          currentSlide={currentSlide}
          changeSlide={changeSlide}
        />
        <Body currentSlide={currentSlide} />
        <Col lg={3}>
          <SlideEdit
            currentSlide={currentSlide}
            detailPresentation={detailPresentation}
            setCurrentSlide={setCurrentSlide}
            setPresentation={setPresentation}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Presentation;
