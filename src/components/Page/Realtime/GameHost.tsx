/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import PresentationDTO, { SlideDTO } from "../../../dtos/PresentationDTO";
import { axiosPrivate } from "../../../token/axiosPrivate";

function GameHost({
  socket
}: {
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  interface AnswerCounter {
    id: string;
    count: number;
  }

  const { presentationId } = useParams();
  const [presentation, setPresentation] = useState<PresentationDTO>();
  const [slide, setSlide] = useState<SlideDTO>();
  const [idx, setIdx] = useState(0);
  const [answer, setAnswer] = useState<AnswerCounter[]>([]);

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
    socket.on("submit_answer", (data: { id: string }) => {
      const { id } = data;
      const checkArray = answer.filter((a) => a.id === id);
      if (checkArray.length === 0) {
        setAnswer((oldAnswer) => [...oldAnswer, { id, count: 1 }]);
      } else {
        const cloneAnswer = [...answer];
        const answerIdx = cloneAnswer.findIndex((a) => a.id === id);
        cloneAnswer[answerIdx].count += 1;
        setAnswer(cloneAnswer);
      }
    });

    return () => {
      socket.off("submit_answer");
    };
  }, [answer, socket]);

  return (
    <Container fluid>
      <Row className="mt-4 mb-4" style={{ textAlign: "center" }}>
        <Col>
          <h1 style={{ fontWeight: "bold" }}>
            {idx + 1}. {slide?.question}
          </h1>
          <h2>{JSON.stringify(answer)}</h2>
        </Col>
      </Row>
    </Container>
  );
}

export default GameHost;
