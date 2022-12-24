/* eslint-disable no-unused-vars */
import React, { Key } from "react";
import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import moment from "moment";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { axiosPrivate } from "../../../token/axiosPrivate";

import "./Kard.css";
import ViewPresentationDTO from "../../../dtos/ViewPresentationDTO";

function GroupPresentKard({
  presentation,
  idx,
  setGame,
  socket
}: {
  presentation: ViewPresentationDTO;
  idx: Key;
  setGame: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  const { groupId } = useParams(); // groupId
  const navigate = useNavigate();

  const groupPresent = () => {
    const game = Math.floor(Math.random() * 10000);
    // Backend
    axiosPrivate({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/game/newgame/`,
      data: { game, presentationId: presentation.id, groupId }
    }).then((response) => {
      console.log(`Game ${game} created successfully.`);
      setGame(game.toString());
      socket.emit("create_game", {
        game: game.toString(),
        presentation: presentation.id,
        group: groupId
      });
      navigate(`/lobbyhost/${presentation.id}/${groupId}/${game}`);
    });
  };

  return (
    <div className="d-flex flex-column">
      <Card
        key={idx}
        className="kard"
        style={{ marginBottom: "8px" }}
        onClick={groupPresent}
      >
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
    </div>
  );
}

export default GroupPresentKard;