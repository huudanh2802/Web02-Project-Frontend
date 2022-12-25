import React, { Key, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaCalendar, FaUser } from "react-icons/fa";
import moment from "moment";

import "./Kard.css";
import { toast } from "react-toastify";
import ViewPresentationDTO from "../../../dtos/ViewPresentationDTO";
import { axiosPrivate } from "../../../token/axiosPrivate";
import "react-toastify/dist/ReactToastify.css";
import "../Toast/ToastStyle.css";

function PresentationKard({
  presentation,
  index,
  setPresentation,
  collabs
}: {
  presentation: ViewPresentationDTO;
  index: Key;
  setPresentation: React.Dispatch<React.SetStateAction<ViewPresentationDTO[]>>;
  collabs: boolean;
}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const viewPresentation = () => {
    const link = `/group/presentation/${presentation.id.toString()}`;
    navigate(link);
  };

  function deletePresentation() {
    setLoading(true);
    axiosPrivate({
      method: "delete",
      url: `${process.env.REACT_APP_API_SERVER}/presentation/${presentation.id}`
    })
      .then((response) => {
        toast.success("Presentation has been deleted.", {
          className: "toast_container"
        });
        setPresentation(response.data);
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      })
      .finally(() => setLoading(false));
  }
  return (
    <div className="d-flex flex-column">
      {loading && <Spinner animation="border" />}
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
          onClick={() => deletePresentation()}
          variant="danger"
        >
          Delete presentation
        </Button>
      )}
    </div>
  );
}

export default PresentationKard;
