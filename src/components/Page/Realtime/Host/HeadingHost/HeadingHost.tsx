import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../Common/Toast/ToastStyle.css";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { Socket } from "socket.io-client";
import {
  HeadingDTO,
  PresentationDTO,
  SlideDTO
} from "../../../../../dtos/PresentationDTO";

export default function HeadingHost({
  slide,
  idx,
  socket,
  presentation,
  game,
  setIdx,
  setSlide
}: {
  slide: HeadingDTO;
  idx: number;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  presentation: PresentationDTO;
  game: string;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
  setSlide: React.Dispatch<React.SetStateAction<SlideDTO>>;
}) {
  const { groupId } = useParams();

  // Button handling

  const navigate = useNavigate();

  const handleNextSlide = () => {
    setIdx(idx + 1);
    setSlide(presentation?.slides[idx]);
    socket.emit("next_question", { game, slide });
  };

  const handleFinishGame = () => {
    // alert("End of presentation");
    toast("End of presentation", {
      className: "toast_container"
    });
    socket.emit("finish_game", { game, groupId });
    navigate(`/group/grouplist`);
  };

  useEffect(() => {
    socket.on("next_question", () => {
      setIdx(idx + 1);
      setSlide(presentation?.slides[idx]);
      console.log(JSON.stringify(presentation?.slides[idx]));
    });

    socket.on("finish_game", () => {
      // alert("Game has ended");
      toast("Game has ended", {
        className: "toast_container"
      });
      socket.emit("leave_game", {
        username: localStorage.getItem("fullname"),
        game
      });
      if (localStorage.getItem("fullname") === null) {
        navigate("/join");
      } else {
        navigate("/group/grouplist");
      }
    });

    return () => {
      socket.off("next_question");
      socket.off("finish_game");
    };
  }, [idx, presentation?.slides, setIdx, setSlide, socket, game, navigate]);

  return (
    <Col>
      <Row className="mb-2" style={{ textAlign: "center" }}>
        <Col>
          <Col className="game-question">
            <h3 style={{ fontWeight: "bold" }}>{slide?.heading}</h3>
          </Col>{" "}
        </Col>
      </Row>
      <Row>
        <Col style={{ textAlign: "center" }}>
          {presentation && idx + 1 < presentation.slides.length && (
            <Button variant="light" onClick={handleNextSlide}>
              Next slide
            </Button>
          )}
          {presentation && idx + 1 >= presentation.slides.length && (
            <Button variant="dark" onClick={handleFinishGame}>
              Finish game
            </Button>
          )}
        </Col>
      </Row>
    </Col>
  );
}
