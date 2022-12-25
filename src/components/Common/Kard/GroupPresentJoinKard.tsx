/* eslint-disable no-unused-vars */
import React, { useEffect, Key } from "react";
import { Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaCalendar } from "react-icons/fa";
import moment from "moment";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Toast/ToastStyle.css";

import "./Kard.css";
import ViewPresentationDTO from "../../../dtos/ViewPresentationDTO";

function GroupPresentKard({
  presentation,
  idx,
  game,
  setGame,
  socket,
  groupId,
  owner
}: {
  presentation: ViewPresentationDTO;
  idx: Key;
  game: string;
  setGame: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
  groupId: string;
  owner: boolean;
}) {
  const navigate = useNavigate();
  const username = localStorage.getItem("fullname");

  const joinGroupPresent = () => {
    if (username !== "" && game !== "") {
      setGame(game);
      if (owner) socket.emit("join_host_game", { username, game });
      else socket.emit("join_game", { username, game, groupId });
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
        slide: number;
      }) => {
        console.log(`Game ${data.game} available: ${data.success}`);
        if (data.success === true) {
          console.log(`Game: ${data.game}`);
          if (data.slide === -1) {
            navigate(`/lobby/${data.presentation}/${data.game}`);
          } else {
            navigate(`/game/${data.presentation}/${data.game}`);
          }
        } else if (data.success === false) {
          const gameType = data.isPrivate ? "private" : "non-existent";
          // alert(`Failed to join ${gameType} game ${data.game}`);
          toast(`Failed to join ${gameType} game ${data.game}`, {
            className: "toast_container"
          });
        }
      }
    );

    socket.on(
      "join_host_game_result",
      (data: { game: string; presentation: any; slide: number }) => {
        console.log(`Game: ${data.game}`);
        if (data.slide === -1) {
          navigate(`/lobbycohost/${data.presentation}/${groupId}/${data.game}`);
        } else {
          navigate(`/gamehost/${data.presentation}/${groupId}/${data.game}`);
        }
      }
    );

    return () => {
      socket.off("join_game_result");
      socket.off("join_host_game_result");
    };
  }, [navigate, socket, game, groupId, owner, presentation.id, presentation]);

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
