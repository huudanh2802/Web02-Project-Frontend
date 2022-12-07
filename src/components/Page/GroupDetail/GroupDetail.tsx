/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Tabs,
  Tab,
  Button,
  Card,
  Form
} from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import UserKard from "../../Common/Kard/UserKard";
import CheckOwnerDTO from "../../../dtos/CheckOwnerDTO";
import GroupInfoDTO from "../../../dtos/GroupInfoDTO";
import { axiosPrivate } from "../../../token/axiosPrivate";

import "./GroupDetail.css";
import ViewPresentationDTO from "../../../dtos/ViewPresentationDTO";
import PresentationKard from "../../Common/Kard/PresentationKard";

function GroupInfo() {
  const { groupId } = useParams();
  const [owner, setOwner] = useState(false);
  const navigate = useNavigate();
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
          <Row xs={1} md={3} lg={6} style={{ marginTop: "16px" }}>
            <Col>
              <UserKard
                groupMember={groupMember}
                setGroupMember={setGroupMember}
                info={groupMember.owner}
                roleId={2}
                owner={owner}
              />
            </Col>
            {groupMember.coowner.length > 0 && (
              <>
                {groupMember.coowner.map((member) => (
                  <Col>
                    <UserKard
                      groupMember={groupMember}
                      setGroupMember={setGroupMember}
                      info={member}
                      roleId={1}
                      owner={owner}
                    />
                  </Col>
                ))}
              </>
            )}
            {groupMember.member.length > 0 && (
              <>
                {groupMember.member.map((member) => (
                  <Col>
                    <UserKard
                      groupMember={groupMember}
                      setGroupMember={setGroupMember}
                      info={member}
                      roleId={0}
                      owner={owner}
                    />
                  </Col>
                ))}
              </>
            )}
          </Row>
        </Tab>
        <Tab eventKey="invite" title="Invite">
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4 mx-4">
                <div className="mb-3">
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label
                        className="text-center"
                        style={{ fontWeight: "bold" }}
                      >
                        Email address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        {...register("email", { required: true })}
                        placeholder="name@example.com"
                      />
                    </Form.Group>

                    <div className="d-grid gap-2">
                      <Button variant="primary" type="submit">
                        Invite
                      </Button>
                      <CopyToClipboard
                        text={`${process.env.REACT_APP_BASE_URL}/group/autojoin/${groupMember.id}`}
                      >
                        <Button
                          variant="outline-dark"
                          onClick={() =>
                            alert("Copied group's link to clipboard")
                          }
                        >
                          Get Group&apos;s link
                        </Button>
                      </CopyToClipboard>
                    </div>
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="presentation" title="Prensentation">
          <Button onClick={() => navigate(`/group/newpresentation/${groupId}`)}>
            Create new Presentation
          </Button>
          <Button onClick={() => navigate(`/join`)}>Join a Game</Button>
          <Row xs={1} md={2} lg={4} style={{ marginTop: "16px" }}>
            {groupPresentation.map((presentation, idx) => (
              <Col>
                <PresentationKard presentation={presentation} index={idx} />
              </Col>
            ))}
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default GroupInfo;
