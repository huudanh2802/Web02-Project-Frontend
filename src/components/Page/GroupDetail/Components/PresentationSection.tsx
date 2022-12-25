import React, { useState, useEffect } from "react";
import { Button, Col, Row, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../Common/Toast/ToastStyle.css";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { axiosPrivate } from "../../../../token/axiosPrivate";
import GroupPresentKard from "../../../Common/Kard/GroupPresentKard";
import GroupPresentJoinKard from "../../../Common/Kard/GroupPresentJoinKard";

import ViewPresentationDTO from "../../../../dtos/ViewPresentationDTO";

function PresentationSection({
  setGame,
  socket,
  owner
}: {
  setGame: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  owner: boolean;
}) {
  const { groupId } = useParams(); // groupId

  // Current presentation
  const [curPresentation, setCurPresentation] = useState<ViewPresentationDTO>();
  const [curGame, setCurGame] = useState<string>();
  useEffect(() => {
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/game/currentPresentation/${groupId}`
    }).then((response) => {
      setCurPresentation(response.data.presentation);
      setCurGame(response.data.game.game);
    });
  }, [groupId]);

  useEffect(() => {
    socket.on(
      "show_group_present",
      (data: { game: string; presentation: any }) => {
        setCurPresentation(data.presentation);
        setCurGame(data.game);
      }
    );

    return () => {
      socket.off("show_group_present");
    };
  });

  useEffect(() => {
    socket.on("hide_group_present", () => {
      setCurPresentation(undefined);
      setCurGame(undefined);
    });

    return () => {
      socket.off("hide_group_present");
    };
  });

  // Presentation list modal
  const [presentations, setPresentations] = useState<ViewPresentationDTO[]>([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (curGame && curPresentation)
      // alert("Another presentation is in session.");
      toast("Another presentation is in session.", {
        className: "toast_container"
      });
    setShow(true);
  };

  const listPresentation = () => {
    const id = localStorage.getItem("id");
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/game/getview/${id}`
    }).then((response) => {
      setPresentations(response.data);
      handleShow();
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>Your presentations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row xs={1} md={2} lg={4} style={{ marginTop: "16px" }}>
            {presentations.map((presentation, idx) => (
              <Col>
                <GroupPresentKard
                  presentation={presentation}
                  idx={idx}
                  setGame={setGame}
                  socket={socket}
                />
              </Col>
            ))}
          </Row>
        </Modal.Body>
      </Modal>

      <h3 className="fw-bold mb-2">Presentation</h3>
      <Button onClick={listPresentation}>Present</Button>
      {curGame && curPresentation && (
        <GroupPresentJoinKard
          presentation={curPresentation}
          idx={0}
          game={curGame}
          setGame={setGame}
          socket={socket}
          groupId={groupId!}
          owner={owner}
        />
      )}
      {(!curGame || !curPresentation) && (
        <header className="mt-2">No current Presentation</header>
      )}
    </>
  );
}

export default PresentationSection;
