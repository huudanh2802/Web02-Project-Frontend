import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PresentationKard from "../../../Common/Kard/PresentationKard";
import ViewPresentationDTO from "../../../../dtos/ViewPresentationDTO";

function PresentationTab({
  groupId,
  groupPresentation,
  setGroupPresentation
}: {
  groupId: string | undefined;
  groupPresentation: ViewPresentationDTO[];
  setGroupPresentation: React.Dispatch<
    React.SetStateAction<ViewPresentationDTO[]>
  >;
}) {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={() => navigate(`/group/newpresentation/${groupId}`)}>
        Create new Presentation
      </Button>
      <Button className="mx-2" onClick={() => navigate(`/join`)}>
        Join a Game
      </Button>
      {groupPresentation.length > 0 && (
        <Row xs={1} md={2} lg={4} style={{ marginTop: "16px" }}>
          {groupPresentation.map((presentation, idx) => (
            <Col>
              <PresentationKard
                setGroupPresentation={setGroupPresentation}
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
