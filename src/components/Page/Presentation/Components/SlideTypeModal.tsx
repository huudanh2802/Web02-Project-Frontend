/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";

export function ChooseSlideType({
  addMutipleChoice,
  addHeading,
  addParagraph,
  handleClose
}: {
  addMutipleChoice: (event: any) => void;
  addHeading: (event: any) => void;
  addParagraph: (event: any) => void;
  handleClose: (event: any) => void;
}) {
  return (
    <Row>
      <Col lg={4}>
        <Button
          className="mt-1"
          variant="outline-dark"
          style={{ width: "100%" }}
          onClick={(e) => {
            addMutipleChoice(e);
            handleClose(e);
          }}
        >
          Mutiple Choice
        </Button>
      </Col>
      <Col lg={4}>
        <Button
          className="mt-1"
          variant="outline-dark"
          style={{ width: "100%" }}
          onClick={(e) => {
            addHeading(e);
            handleClose(e);
          }}
        >
          Heading
        </Button>
      </Col>
      <Col lg={4}>
        <Button
          className="mt-1"
          variant="outline-dark"
          style={{ width: "100%" }}
          onClick={(e) => {
            addParagraph(e);
            handleClose(e);
          }}
        >
          Paragraph
        </Button>
      </Col>
    </Row>
  );
}

export default function SlideTypeModal({
  show,
  setShow,
  addMutipleChoice,
  addHeading,
  addParagraph
}: {
  show: boolean;
  setShow: (event: any) => void;
  addMutipleChoice: (event: any) => void;
  addHeading: (event: any) => void;
  addParagraph: (event: any) => void;
}) {
  const handleClose = () => setShow(false);

  return (
    <Modal centered size="lg" show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Choose Slide</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {ChooseSlideType({
          addMutipleChoice,
          addHeading,
          addParagraph,
          handleClose
        })}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
