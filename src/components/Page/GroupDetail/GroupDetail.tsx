/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CheckOwnerDTO from "../../../dtos/CheckOwnerDTO";
import GroupInfoDTO from "../../../dtos/GroupInfoDTO";
import { axiosPrivate } from "../../../token/axiosPrivate";

import "./GroupDetail.css";
import ViewPresentationDTO from "../../../dtos/ViewPresentationDTO";

import MemberTab from "./Components/MemberTab";
import PresentationTab from "./Components/PresentationTab";
import InviteModal from "./Components/InviteModal";

function GroupInfo() {
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
  const [groupPresentation, setGroupPresentation] = useState<
    ViewPresentationDTO[]
  >([]);

  function getPresentation() {
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/presentation/groupget/${groupId}`
    }).then((response) => {
      setGroupPresentation(response.data);
    });
  }
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
    getPresentation();
    console.log(owner);
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
        <Tabs
          defaultActiveKey="presentation"
          id="group-list-tab"
          className="mb-3"
        >
          <Tab eventKey="members" title="Members">
            <MemberTab
              groupMember={groupMember}
              setGroupMember={setGroupMember}
              owner={owner}
              handleShow={handleShow}
            />
          </Tab>
          <Tab eventKey="presentation" title="Prensentation">
            <PresentationTab
              groupId={groupId}
              groupPresentation={groupPresentation}
              setGroupPresentation={setGroupPresentation}
            />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default GroupInfo;
