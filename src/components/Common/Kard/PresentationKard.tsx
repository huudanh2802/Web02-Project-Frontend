import React, { Key } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import moment from "moment";

import "./Kard.css";
import ViewPresentationDTO from "../../../dtos/ViewPresentationDTO";
import { axiosPrivate } from "../../../token/axiosPrivate";

function PresentationKard({
  presentation,
  index,
  setGroupPresentation
}: {
  presentation: ViewPresentationDTO;
  index: Key;
  setGroupPresentation: React.Dispatch<
    React.SetStateAction<ViewPresentationDTO[]>
  >;
}) {
  const navigate = useNavigate();

  const viewPresentation = () => {
    const link = `/group/presentation/${presentation.id.toString()}`;
    navigate(link);
  };

  function deletePresentation() {
    axiosPrivate({
      method: "delete",
      url: `${process.env.REACT_APP_API_SERVER}/presentation/${presentation.id}`
    }).then((response) => {
      alert("Presentation has been deleted");
      setGroupPresentation(response.data);
      window.location.reload();
    });
  }
  return (
    <div className="d-flex flex-column">
      <Card key={index} className="kard" onClick={viewPresentation}>
        <div className="kard-header">
          <img
            src={`/assets/card-bg-${Math.floor(Math.random() * 8)}.jpg`}
            alt="bg"
          />
        </div>
        <div className="kard-body">
          <header>{presentation.name}</header>
          <div className="time">
            <FaCalendar className="mx-2" />
            <small>
              {moment(presentation.createdAt.toString()).format(
                "MMMM Do, YYYY"
              )}
            </small>
          </div>
        </div>
      </Card>
      <Button
        style={{ width: "inherit" }}
        onClick={() => deletePresentation()}
        variant="danger"
      >
        Delete presentation
      </Button>
    </div>
  );
}

export default PresentationKard;
