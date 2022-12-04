/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import { Container, Tabs, Tab } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import PresentationTab from "./Components/PresentationTab";
import MemberTab from "./Components/MemberTab";

import CheckOwnerDTO from "../../../dtos/CheckOwnerDTO";
import GroupInfoDTO from "../../../dtos/GroupInfoDTO";
import PresentationDTO from "../../../dtos/PresentationDTO";
import { axiosPrivate } from "../../../token/axiosPrivate";

import "./GroupDetail.css";

function GroupDetail() {
  const { groupId } = useParams();
  const [owner, setOwner] = useState(false);

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

  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => {
    const email = data;
    axiosPrivate({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/group/invitebyemail/${groupId}`,
      data: email
    }).then((response) => {
      alert(response.data);
    });
  };

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
    console.log(owner);
  }, []);

  const mockPresentations: PresentationDTO[] = [
    {
      id: "1",
      name: "Course Introduction",
      slideNum: 6,
      createdAt: Date()
    },
    {
      id: "2",
      name: "Web Fundamentals",
      slideNum: 10,
      createdAt: Date()
    },
    {
      id: "3",
      name: "Final Examination",
      slideNum: 4,
      createdAt: Date()
    }
  ];

  return (
    <Container>
      <h1 className="page-title" style={{ marginBottom: "32px" }}>
        {groupMember.name}
      </h1>
      <Tabs defaultActiveKey="members" id="group-list-tab" className="mb-3">
        <Tab eventKey="presentations" title="Presentations">
          <PresentationTab presentations={mockPresentations} />
        </Tab>
        <Tab eventKey="members" title="Members">
          <MemberTab
            groupMember={groupMember}
            setGroupMember={setGroupMember}
            owner={owner}
            inviteDTO={{ register, handleSubmit, onSubmit, groupMember }}
          />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default GroupDetail;
