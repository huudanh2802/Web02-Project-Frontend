/* eslint-disable no-unused-vars */
import React, { useEffect, Key } from "react";
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
  game,
  setGame,
  socket,
  groupId
}: {
  presentation: ViewPresentationDTO;
  idx: Key;
  game: string;
  setGame: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  groupId: string;
}) {
  const navigate = useNavigate();
  const username = localStorage.getItem("fullname");

  const joinGroupPresent = () => {
    if (username !== "" && game !== "") {
      setGame(game);
      socket.emit("join_game", { username, game, groupId });
    }
  };

  useEffect(() => {
    socket.on(
      "join_game_result",
      (data: {
        success: boolean;
        game: string;
        presentation: string;
        isPrivate: boolean;
      }) => {
        console.log(`Game ${data.game} available: ${data.success}`);
        if (data.success === true) {
          console.log(`Game: ${data.game}`);
          navigate(`/lobby/${data.presentation}/${data.game}`);
        } else if (data.success === false) {
          const gameType = data.isPrivate ? "private" : "non-existent";
          alert(`Failed to join ${gameType} game ${data.game}`);
        }
      }
    );
    return () => {
      socket.off("join_game_result");
    };
  }, [navigate, socket]);

  return (
    <div className="d-flex flex-column mt-2">
      <Card
        key={idx}
        className="kard"
        style={{ marginBottom: "8px" }}
        onClick={joinGroupPresent}
      >
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
