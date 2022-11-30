/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { Col, Container, Row, Form, Card, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import CheckOwnerDTO from "../../../../dtos/CheckOwnerDTO";
import GroupInfoDTO from "../../../../dtos/GroupInfoDTO";
import { axiosPrivate } from "../../../../token/axiosPrivate";
import MemberInfo from "../MemberInfo/MemberInfo";
import OwnerInfo from "../OwnerInfo/OwnerInfo";
import "./DetailGroupInfo.css";

export default function DetailGroupInfo() {
  const { groupId } = useParams();
  const [owner, setOwner] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const [groupMember, setGroupMember] = useState<GroupInfoDTO>({
    id: "",
    name: "",
    owner: {
      id: "",
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

  function onSubmit(data: any) {
    const email = data;
    axiosPrivate({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/group/invitebyemail/${groupId}`,
      data: email
    }).then((response) => {
      alert(response.data);
    });
  }

  return (
    <Container className="group-container">
      <h2 className="group-title">Group Info</h2>
      <Card>
        <Row>
          <Col lg={3}>
            <img src="/assets/group1.png" width={150} height={150} />
          </Col>
          <Col>
            <Row>
              <h5
                style={{
                  color: "#389CB2",
                  fontWeight: "bold",
                  margin: "8px 0 8px 0"
                }}
              >
                Group Name: {groupMember.name}
              </h5>
            </Row>
            <Row>
              <h5
                style={{
                  color: "#389CB2",
                  fontWeight: "bold",
                  margin: "8px 0 8px 0"
                }}
              >
                Links :{" "}
                {`${process.env.REACT_APP_BASE_URL}/group/autojoin/${groupMember.id}`}
              </h5>
            </Row>
            <Row
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline"
              }}
            >
              <Col lg={2}>
                <h5
                  style={{
                    color: "#389CB2",
                    fontWeight: "bold",
                    margin: "8px 0 8px 0"
                  }}
                >
                  Invite by email:
                </h5>
              </Col>
              <Col>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    placeholder="Enter email"
                    {...register("email", { required: true })}
                    style={{ width: "200px", marginRight: "20px" }}
                  />
                  <Button variant="secondary" type="submit">
                    Submit
                  </Button>
                </form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Row>
        <h5 className="group-title">Owner</h5>
        <OwnerInfo owner={groupMember.owner} />
      </Row>
      <h5 className="group-title">Member</h5>
      <Row className="group-member">
        {groupMember.coowner.length > 0 && (
          <>
            {groupMember.coowner.map((member) => (
              <MemberInfo
                groupMember={groupMember}
                setGroupMember={setGroupMember}
                memberDTO={member}
                // eslint-disable-next-line jsx-a11y/aria-role
                role={1}
                owner={owner}
              />
            ))}
          </>
        )}
        {groupMember.member.length > 0 && (
          <>
            {groupMember.member.map((member) => (
              <MemberInfo
                groupMember={groupMember}
                setGroupMember={setGroupMember}
                memberDTO={member}
                // eslint-disable-next-line jsx-a11y/aria-role
                role={2}
                owner={owner}
              />
            ))}
          </>
        )}
      </Row>
    </Container>
  );
}
