import { Col, Row, Image, Button } from "react-bootstrap";
import React from "react";
import { FaInfo } from "react-icons/fa";
import Select from "react-select";
import "./MemberRole.css";
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

  return (
    <Row className={add ? "member" : "member noAdd"}>
      <Col lg={3}>
        <Image
          // eslint-disable-next-line react/style-prop-object
          className="ava"
          fluid
          src="/assets/profileAvatar.png"
        />
      </Col>
      <Col lg={3}>
        <p className="text">{memberData.email}</p>
      </Col>
      <Col lg={3} className="d-flex flex-row justify-content-center">
        <Button type="button" className="iconBtn">
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
