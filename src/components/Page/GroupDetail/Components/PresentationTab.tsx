/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "react-bootstrap";
import NewPresentationModal from "./NewPresentationModal";
import PresentationKard from "../../../Common/Kard/PresentationKard";
import PresentationDTO from "../../../../dtos/PresentationDTO";
import { axiosPrivate } from "../../../../token/axiosPrivate";

function PresentationTab({
  owner,
  groupId
}: {
  owner: boolean;
  groupId: string | undefined;
}) {
  // New Presentation Modal handling
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [presentations, setPresentations] = useState<PresentationDTO[]>([]);

  function getPresentations() {
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/group/presentation/${groupId}`
    })
      .then((response) => {
        setPresentations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getPresentations();
  }, []);

  return (
    <>
      {owner && (
        <Button variant="primary" onClick={handleShow}>
          New Presentation
        </Button>
      )}
      <NewPresentationModal
        showModal={showModal}
        handleClose={handleClose}
        groupId={groupId}
      />
      <Row xs={1} md={2} lg={4} style={{ marginTop: "16px" }}>
        {presentations.map((presentation) => (
          <Col>
            <PresentationKard presentation={presentation} index={0} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default PresentationTab;
