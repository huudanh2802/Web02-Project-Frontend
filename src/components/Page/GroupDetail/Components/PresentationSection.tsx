import React, { useState } from "react";
import { Button, Col, Row, Modal } from "react-bootstrap";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { axiosPrivate } from "../../../../token/axiosPrivate";
import GroupPresentKard from "../../../Common/Kard/GroupPresentKard";

import ViewPresentationDTO from "../../../../dtos/ViewPresentationDTO";

function PresentationSection({
  setGame,
  socket
}: {
  setGame: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  // Presentation list modal
  const [presentations, setPresentations] = useState<ViewPresentationDTO[]>([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const listPresentation = () => {
    const id = localStorage.getItem("id");
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/presentation/getview/${id}`
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
      <header className="mt-4">No current Presentation</header>
    </>
  );
}

export default PresentationSection;
