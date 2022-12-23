/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import {
  FieldValues,
  UseFormHandleSubmit,
  UseFormRegister
} from "react-hook-form";
import {
  FaArrowLeft,
  FaEdit,
  FaPlay,
  FaSave,
  FaUserPlus
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PresentationDTO } from "../../../../dtos/PresentationDTO";

import NameModal from "./NameModal";

import "../Presentation.css";
import CollabsModal from "./Collabs/CollabsModal";

function TopBar({
  sendSlide,
  present,
  detailPresentation,
  setPresentation,
  registerName,
  handleSubmitName,
  checkOwn
}: {
  sendSlide: () => Promise<void>;
  present: (() => void) | undefined;
  detailPresentation: PresentationDTO;
  setPresentation: React.Dispatch<React.SetStateAction<PresentationDTO>>;
  registerName: UseFormRegister<FieldValues>;
  handleSubmitName: UseFormHandleSubmit<FieldValues>;
  checkOwn: boolean;
}) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [showCollabs, setShowCollabs] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseCollabs = () => setShowCollabs(false);
  const handleShowCollabs = () => setShowCollabs(true);

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
      <CollabsModal
        showCollabs={showCollabs}
        handleCloseCollabs={handleCloseCollabs}
      />
      <Row className="p-top-bar">
        <Col lg={1}>
          <Button
            variant="outline-dark"
            onClick={() => navigate("/group/groupList")}
          >
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
        <Col lg={6}>
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
              {checkOwn && (
                <Button
                  className="p-present-button"
                  variant="outline-dark"
                  onClick={handleShowCollabs}
                >
                  <FaUserPlus style={{ margin: "0 8px 4px 0" }} /> Manage
                  Collabs
                </Button>
              )}

              {present && (
                <Button
                  className="p-present-button ml-2"
                  variant="primary"
                  onClick={() => present()}
                >
                  <FaPlay style={{ margin: "0 8px 4px 0" }} /> Present
                </Button>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default TopBar;
