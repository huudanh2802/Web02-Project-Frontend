import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PresentationKard from "../../../Common/Kard/PresentationKard";
import ViewPresentationDTO from "../../../../dtos/ViewPresentationDTO";

function PresentationTab({
  presentations,
  setPresentations
}: {
  presentations: ViewPresentationDTO[];
  setPresentations: React.Dispatch<React.SetStateAction<ViewPresentationDTO[]>>;
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
      {presentations.length > 0 && (
        <Row xs={1} md={2} lg={4} style={{ marginTop: "16px" }}>
          {presentations.map((presentation, idx) => (
            <Col>
              <PresentationKard
                setPresentation={setPresentations}
                presentation={presentation}
                index={idx}
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

export default PresentationTab;
