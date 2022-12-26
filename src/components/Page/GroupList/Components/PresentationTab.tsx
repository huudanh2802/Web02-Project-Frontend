/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PresentationKard from "../../../Common/Kard/PresentationKard";
import ViewPresentationDTO from "../../../../dtos/ViewPresentationDTO";
import { axiosPrivate } from "../../../../token/axiosPrivate";

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
  const [loading, setLoading] = useState(false);

  function deletePresentation(presentation: ViewPresentationDTO) {
    setLoading(true);
    axiosPrivate({
      method: "delete",
      url: `${process.env.REACT_APP_API_SERVER}/presentation/${presentation.id}`
    })
      .then((response) => {
        toast.success("Presentation has been deleted.", {
          className: "toast_container"
        });
        setPresentationsOwn((current) =>
          current.filter((e) => e.id !== presentation.id)
        );
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      {loading && (
        <div className="spinner-background">
          <Spinner animation="border" variant="light" />
        </div>
      )}
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
                  deletePresentation={() => deletePresentation(presentation)}
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
                  deletePresentation={() => deletePresentation(presentation)}
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
