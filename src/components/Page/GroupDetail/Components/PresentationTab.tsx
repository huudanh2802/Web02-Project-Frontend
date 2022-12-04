import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import PresentationKard from "../../../Common/Kard/PresentationKard";
import PresentationDTO from "../../../../dtos/PresentationDTO";

function PresentationTab({
  presentations
}: {
  presentations: PresentationDTO[];
}) {
  return (
    <>
      <Button variant="primary">New Presentation</Button>
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
