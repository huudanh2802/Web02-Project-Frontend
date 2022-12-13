/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldValues
} from "react-hook-form";
import { FaPlay, FaArrowLeft, FaSave, FaEdit } from "react-icons/fa";
import PresentationDTO from "../../../../dtos/PresentationDTO";

import NameModal from "./NameModal";

import "../Presentation.css";

function TopBar({
  sendSlide,
  present,
  detailPresentation,
  setPresentation,
  registerName,
  handleSubmitName
}: {
  sendSlide: () => Promise<void>;
  present: () => void;
  detailPresentation: PresentationDTO;
  setPresentation: React.Dispatch<React.SetStateAction<PresentationDTO>>;
  registerName: UseFormRegister<FieldValues>;
  handleSubmitName: UseFormHandleSubmit<FieldValues>;
}) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <NameModal
        show={show}
        handleClose={handleClose}
        detailPresentation={detailPresentation}
        setPresentation={setPresentation}
        registerName={registerName}
        handleSubmitName={handleSubmitName}
      />
      <Row className="p-top-bar">
        <Col lg={1}>
          <Button variant="outline-dark" onClick={() => navigate(-1)}>
            <FaArrowLeft style={{ margin: "0 0 4px" }} />
          </Button>
        </Col>
        <Col>
          <h2 className="p-title">
            {detailPresentation.name}{" "}
            <FaEdit
              style={{ width: "24px", height: "24px", cursor: "pointer" }}
              onClick={handleShow}
            />
          </h2>
        </Col>
        <Col lg={4}>
          <Row>
            <Col />
            <Col>
              <Button
                className="p-present-button"
                variant="outline-dark"
                onClick={sendSlide}
              >
                <FaSave style={{ margin: "0 8px 4px 0" }} /> Save
              </Button>
              <Button
                className="p-present-button ml-2"
                variant="primary"
                onClick={() => present()}
              >
                <FaPlay style={{ margin: "0 8px 4px 0" }} /> Present
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default TopBar;
