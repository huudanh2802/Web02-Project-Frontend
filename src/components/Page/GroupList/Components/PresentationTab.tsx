/* eslint-disable no-unused-vars */
import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PresentationKard from "../../../Common/Kard/PresentationKard";
import ViewPresentationDTO from "../../../../dtos/ViewPresentationDTO";

function PresentationTab({
  presentationsOwn,
  setPresentationsOwn,
  presentationsCollabs
}: {
  presentationsOwn: ViewPresentationDTO[];
  setPresentationsOwn: React.Dispatch<
    React.SetStateAction<ViewPresentationDTO[]>
  >;
  presentationsCollabs: ViewPresentationDTO[];
}) {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate(`/group/newpresentation`)}>
        Create new Presentation
      </Button>
      <Button className="mx-2" onClick={() => navigate(`/join`)}>
        Join a Game
      </Button>
      <Row xs={1} md={2} lg={4} style={{ marginTop: "16px" }}>
        {presentationsOwn.length > 0 && (
          <>
            {presentationsOwn.map((presentation, idx) => (
              <Col>
                <PresentationKard
                  setPresentation={setPresentationsOwn}
                  presentation={presentation}
                  index={idx}
                  collabs={false}
                />
              </Col>
            ))}
          </>
        )}
        {presentationsCollabs.length > 0 && (
          <>
            {presentationsCollabs.map((presentation, idx) => (
              <Col>
                <PresentationKard
                  setPresentation={setPresentationsOwn}
                  presentation={presentation}
                  index={idx}
                  collabs
                />
              </Col>
            ))}
          </>
        )}
      </Row>
    </>
  );
}

export default PresentationTab;
