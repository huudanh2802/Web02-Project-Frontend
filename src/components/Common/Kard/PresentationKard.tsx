/* eslint-disable no-unused-vars */
import moment from "moment";
import React, { Key } from "react";
import { Button, Card } from "react-bootstrap";
import { FaCalendar, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import ViewPresentationDTO from "../../../dtos/ViewPresentationDTO";
import "../Toast/ToastStyle.css";
import "./Kard.css";

function PresentationKard({
  presentation,
  index,
  setPresentation,
  collabs,
  deletePresentation
}: {
  presentation: ViewPresentationDTO;
  index: Key;
  setPresentation: React.Dispatch<React.SetStateAction<ViewPresentationDTO[]>>;
  collabs: boolean;
  deletePresentation: (event: any) => void;
}) {
  const navigate = useNavigate();

  const viewPresentation = () => {
    const link = `/group/presentation/${presentation.id.toString()}`;
    navigate(link);
  };

  return (
    <div className="d-flex flex-column">
      <Card
        key={index}
        className="kard"
        style={{ marginBottom: "8px" }}
        onClick={viewPresentation}
      >
        <div
          className="kard-header"
          style={
            collabs ? { background: "yellow" } : { background: "aquamarine" }
          }
        >
          <div style={{ margin: "20px" }}>
            <FaUser />
            <span style={{ fontWeight: "bold", margin: "10" }}>
              {collabs ? "Collabs" : "Owned"}
            </span>
          </div>
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
      {!collabs && (
        <Button
          style={{ width: "inherit", marginBottom: "24px" }}
          onClick={() => deletePresentation(presentation)}
          variant="danger"
        >
          Delete presentation
        </Button>
      )}
    </div>
  );
}

export default PresentationKard;
