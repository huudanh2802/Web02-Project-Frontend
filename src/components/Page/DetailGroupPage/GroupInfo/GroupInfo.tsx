/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Container, Row, Form, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CheckOwnerDTO from "../../../../dtos/CheckOwnerDTO";
import GroupInfoDTO from "../../../../dtos/GroupInfoDTO";
import MemberInfo from "../MemberInfo/MemberInfo";
import OwnerInfo from "../OwnerInfo/OwnerInfo";
import "./GroupInfo.css";

export default function GroupInfo() {
  const { groupId } = useParams();
  const [owner, setOwner] = useState(false);
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
    axios({
      method: "post",
      url: `http://localhost:8081/group/checkowner/`,
      data: checkOwnerDTO
    }).then((response) => {
      setOwner(response.data);
    });
  }

  function getGroupMember() {
    axios({
      method: "get",
      url: `http://localhost:8081/group/get/${groupId}`
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
    <Container className="group-container">
      <h2 className="group-title">Group Info</h2>
      <Card>
        <Row>
          <Col>
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
                Links
              </h5>
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
