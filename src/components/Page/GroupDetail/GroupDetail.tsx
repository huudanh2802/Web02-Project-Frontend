/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { axiosPrivate } from "../../../token/axiosPrivate";
import CheckOwnerDTO from "../../../dtos/CheckOwnerDTO";
import GroupInfoDTO from "../../../dtos/GroupInfoDTO";

import "./GroupDetail.css";

import InviteModal from "./Components/InviteModal";
import PresentationSection from "./Components/PresentationSection";
import MemberSection from "./Components/MemberSection";

function GroupInfo({
  setGame,
  socket
}: {
  setGame: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  const { groupId } = useParams();
  const [owner, setOwner] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [groupMember, setGroupMember] = useState<GroupInfoDTO>({
    id: "",
    name: "",
    owner: {
      id: "",
      fullname: "",
      email: ""
    },
    coowner: [],
    member: []
  });

  function checkOwner(ownerId: string) {
    const checkOwnerDTO: CheckOwnerDTO = {
      ownerId,
      groupId: groupId!
    };
    axiosPrivate({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/group/checkowner/`,
      data: checkOwnerDTO
    }).then((response) => {
      setOwner(response.data);
    });
  }

  function getGroupMember() {
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/group/get/${groupId}`
    }).then((response) => {
      setGroupMember(response.data);
      console.log(response.data);
    });
  }

  useEffect(() => {
    const ownerId = localStorage.getItem("id");
    if (ownerId) {
      checkOwner(ownerId);
    }
    getGroupMember();
  }, []);

  return (
    <>
      <InviteModal
        show={show}
        handleClose={handleClose}
        groupId={groupId}
        groupMember={groupMember}
      />
      <Container>
        <h1 className="page-title" style={{ marginBottom: "32px" }}>
          {groupMember.name}
        </h1>
        <hr className="my-3" />
        <PresentationSection setGame={setGame} socket={socket} />
        <hr className="my-3" />
        <MemberSection
          groupMember={groupMember}
          setGroupMember={setGroupMember}
          owner={owner}
          handleShow={handleShow}
        />
      </Container>
    </>
  );
}

export default GroupInfo;
