/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaInfo, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router";
import Select from "react-select";
import MemberRoleDTO from "../../../../dtos/MemberRoleDTO";
import NewGroupDTO from "../../../../dtos/NewGroupDTO";
import { removeItem } from "../../../../helpers/functions";
import "./MemberRole.css";

const roleOptions = [
  { value: 1, label: "Co-owner" },
  { value: 2, label: "Member" }
];

function MemberRole({
  memberData,
  add,
  newGroup,
  setNewGroup,
  removeMember
}: {
  memberData: MemberRoleDTO;
  add: boolean;
  newGroup: NewGroupDTO;
  setNewGroup: React.Dispatch<React.SetStateAction<NewGroupDTO>>;
  removeMember: (event: any) => void;
}) {
  const navigate = useNavigate();
  function setRoleMember(event: any) {
    const role = event.value;
    switch (role) {
      case 1: {
        newGroup.coowner.push(memberData);
        newGroup.member = newGroup!.member.filter(
          (m) => m.id !== memberData.id
        );
        setNewGroup!(newGroup!);
        break;
      }
      case 2: {
        newGroup!.member.push(memberData);
        newGroup.coowner = newGroup!.coowner.filter(
          (m) => m.id !== memberData.id
        );
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
        <FaUserCircle size={40} />
      </Col>
      <Col>
        <p style={{ fontWeight: "bold", margin: "0" }}>{memberData.email}</p>
        <p style={{ color: "#8ea1b0" }}>{memberData.fullname}</p>
      </Col>
      <Col className="d-flex flex-row justify-content-center">
        <Button type="button" className="iconBtn" onClick={redirectProfile}>
          <FaInfo className="icon" />
        </Button>
      </Col>
      <Col>
        <Button variant="danger" onClick={() => removeMember(memberData)}>
          Remove
        </Button>
      </Col>
      {add && (
        <Col>
          <Select
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderRadius: "20px"
              })
            }}
            options={roleOptions}
            onChange={(role) => setRoleMember(role)}
            defaultValue={roleOptions[1]}
          />
        </Col>
      )}
    </Row>
  );
}

export default MemberRole;
