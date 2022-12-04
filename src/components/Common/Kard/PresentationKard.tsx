import React, { Key } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import moment from "moment";
import PresentationDTO from "../../../dtos/PresentationDTO";

import "./Kard.css";

function PresentationKard({
  presentation,
  index
}: {
  presentation: PresentationDTO;
  index: Key;
}) {
  const navigate = useNavigate();

  const viewPresent = () => {
    const link = `/group/presentation/${presentation.id.toString()}`;
    navigate(link);
  };

  return (
    <Card key={index} className="kard" onClick={viewPresent}>
      <div className="kard-header">
        <img
          src={`/assets/card-bg-${Math.floor(Math.random() * 8)}.jpg`}
          alt="bg"
        />
      </div>
      <div className="kard-body">
        <header>{presentation.name}</header>
        <span className="tag tag-teal">
          {presentation.slideNum} Slide{presentation.slideNum === 1 ? "" : "s"}
        </span>
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
