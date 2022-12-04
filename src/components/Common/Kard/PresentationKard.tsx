import React, { Key } from "react";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
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
    const link = `/presentation/${presentation.id.toString()}`;
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
      </div>
    </Card>
  );
}

export default PresentationKard;
