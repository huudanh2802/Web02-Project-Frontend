import React, { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import NewPresentationModal from "./NewPresentationModal";
import PresentationKard from "../../../Common/Kard/PresentationKard";
import PresentationDTO from "../../../../dtos/PresentationDTO";

function PresentationTab({
  presentations,
  owner
}: {
  presentations: PresentationDTO[];
  owner: boolean;
}) {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      {owner && (
        <Button variant="primary" onClick={handleShow}>
          New Presentation
        </Button>
      )}
      <NewPresentationModal showModal={showModal} handleClose={handleClose} />
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
