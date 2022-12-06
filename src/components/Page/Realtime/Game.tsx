/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import Answer from "./Answer";
import PresentationDTO, { SlideDTO } from "../../../dtos/PresentationDTO";
import { axiosPrivate } from "../../../token/axiosPrivate";

function Game({
  game,
  socket
}: {
  game: string;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  const { presentationId, id } = useParams();
  const [presentation, setPresentation] = useState<PresentationDTO>();
  const [slide, setSlide] = useState<SlideDTO>();
  const [idx, setIdx] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const getPresentation = () => {
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/game/get/${presentationId}`
    }).then((response) => {
      setPresentation(response.data);
      setSlide(response.data.slides[idx]);
      console.log(response.data);
    });
  };

  useEffect(() => {
    getPresentation();
  }, []);

  return (
    <Container fluid>
      <Row className="mt-4 mb-4" style={{ textAlign: "center" }}>
        <Col>
          <h1 style={{ fontWeight: "bold" }}>
            {idx + 1}. {slide?.question}
          </h1>
        </Col>
      </Row>
      <Row sm={1} md={2} lg={2}>
        {!submitted &&
          slide?.answers.map((a) => (
            <Col>
              <Answer
                id={a.id}
                answer={a.answer}
                question={idx}
                game={game}
                socket={socket}
                setSubmitted={setSubmitted}
              />
            </Col>
          ))}
      </Row>
      {submitted && (
        <div style={{ textAlign: "center" }}>
          <h2>You have submitted your answer</h2>
        </div>
      )}
    </Container>
  );
}

export default Game;
