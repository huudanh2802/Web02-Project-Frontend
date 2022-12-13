/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import PresentationDTO, { SlideDTO } from "../../../dtos/PresentationDTO";
import { nextChar } from "../../../helpers/functions";
import { axiosPrivate } from "../../../token/axiosPrivate";

import TopBar from "./Components/TopBar";
import SlideBar from "./Components/SlideBar";
import Body from "./Components/Body";
import SlideEdit from "./Components/SlideEdit";

import "./Presentation.css";

function Presentation({
  setGame,
  socket
}: {
  setGame: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState<SlideDTO>({
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

  const [detailPresentation, setPresentation] = useState<PresentationDTO>({
    name: "",
    groupId: "",
    slides: [currentSlide]
  });

  const {
    register: registerName,
    trigger,
    handleSubmit: handleSubmitName,
    formState: { errors: errorsName }
  } = useForm();

  async function sendSlide() {
    const result = await trigger("name");
    console.log(result);
    if (result) {
      axiosPrivate({
        method: "put",
        url: `${process.env.REACT_APP_API_SERVER}/presentation/update/${id}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        },

        data: detailPresentation
      }).then((response) => {
        alert("Presentation has been updated");
      });
    }
  }
  useEffect(() => {
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/presentation/get/${id}`
    })
      .then((response) => {
        console.log(response.data.slides[0]);
        setCurrentSlide(response.data.slides[0]);
        setPresentation(response.data);
      })
      .catch((err) => {
        alert(err);
        navigate("/");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addSlide = (event: any) => {
    const newSlide: SlideDTO = {
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
    console.log(currentSlide);
  };

  const changeSlide = (idx: number) => {
    const slideChange = detailPresentation.slides[idx];
    setCurrentSlide(slideChange);
  };

  const present = () => {
    const game = Math.floor(Math.random() * 10000);
    console.log(game);
    setGame(game.toString());
    socket.emit("create_game", { game: game.toString(), presentation: id });
    navigate(`/lobbyhost/${id}/${game}`);
  };

  return (
    <Container fluid>
      <TopBar
        sendSlide={() => sendSlide()}
        present={present}
        detailPresentation={detailPresentation}
        setPresentation={setPresentation}
        registerName={registerName}
        handleSubmitName={handleSubmitName}
      />
      <Row className="mt-2">
        <SlideBar
          addSlide={addSlide}
          detailPresentation={detailPresentation}
          currentSlide={currentSlide}
          changeSlide={changeSlide}
        />
        <Body currentSlide={currentSlide} />
        <SlideEdit
          currentSlide={currentSlide}
          detailPresentation={detailPresentation}
          setCurrentSlide={setCurrentSlide}
          setPresentation={setPresentation}
        />
      </Row>
    </Container>
  );
}

export default Presentation;
