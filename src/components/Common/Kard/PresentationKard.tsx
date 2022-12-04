import React, { Key } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import moment from "moment";

import "./Kard.css";
import ViewPresentationDTO from "../../../dtos/ViewPresentationDTO";

function PresentationKard({
  presentation,
  index
}: {
  presentation: ViewPresentationDTO;
  index: Key;
}) {
  const navigate = useNavigate();

  const viewPresentation = () => {
    const link = `/group/presentation/${presentation.id.toString()}`;
    navigate(link);
  };

  return (
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
            {moment(presentation.createdAt.toString()).format("MMMM Do, YYYY")}
          </small>
        </div>
      </div>
    </Card>
  );
}

export default PresentationKard;
