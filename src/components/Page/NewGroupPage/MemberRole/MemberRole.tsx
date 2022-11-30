import { Col, Row, Image, Button } from "react-bootstrap";
import React from "react";
import { FaInfo } from "react-icons/fa";
import Select from "react-select";
import "./MemberRole.css";
import { useNavigate } from "react-router";
import MemberRoleDTO from "../../../../dtos/MemberRoleDTO";
import NewGroupDTO from "../../../../dtos/NewGroupDTO";
import { removeItem } from "../../../../helpers/functions";

const roleOptions = [
  { value: 3, label: "Select..." },
  { value: 1, label: "Co-owner" },
  { value: 2, label: "Member" }
];

function MemberRole({
  memberData,
  add,
  newGroup,
  setNewGroup
}: {
  memberData: MemberRoleDTO;
  add: boolean;
  newGroup: NewGroupDTO | null;
  setNewGroup: React.Dispatch<React.SetStateAction<NewGroupDTO>> | null;
}) {
  const navigate = useNavigate();
  function setRoleMember(event: any) {
    const role = event.value;
    switch (role) {
      case 1: {
        newGroup!.coowner.push(memberData);
        removeItem(newGroup!.member, memberData);
        setNewGroup!(newGroup!);
        break;
      }
      case 2: {
        newGroup!.member.push(memberData);
        removeItem(newGroup!.coowner, memberData);
        setNewGroup!(newGroup!);
        break;
      }
      default: {
        removeItem(newGroup!.coowner, memberData);
        removeItem(newGroup!.member, memberData);
        setNewGroup!(newGroup!);
        break;
      }
    }
  }
  // eslint-disable-next-line no-unused-vars
  const redirectProfile = (event: any) => {
    console.log("Hello");
    navigate(`/group/profile/${memberData.id}`);
  };
  return (
    <Row className={add ? "member" : "member noAdd"}>
      <Col lg={2}>
        <Image
          // eslint-disable-next-line react/style-prop-object
          className="ava"
          fluid
          src="/assets/profileAvatar.png"
        />
      </Col>
      <Col lg={3}>
        <p className="email-text">{memberData.email}</p>
      </Col>
      <Col lg={3} className="d-flex flex-row justify-content-center">
        <Button type="button" className="iconBtn" onClick={redirectProfile}>
          <FaInfo className="icon" />
        </Button>
      </Col>
      {add && (
        <Col lg={3}>
          <Select
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderRadius: "20px"
              })
            }}
            options={roleOptions}
            onChange={(role) => setRoleMember(role)}
          />
        </Col>
      )}
    </Row>
  );
}

export default MemberRole;
