/* eslint-disable no-unused-vars */
import React from "react";
import { Image, Row, Col, Button } from "react-bootstrap";
import { FaInfo } from "react-icons/fa";
import Select from "react-select";
import GroupInfoDTO from "../../../../dtos/GroupInfoDTO";
import MemberDTO from "../../../../dtos/MemberDTO";
import ModifyGroupDTO from "../../../../dtos/ModifyGroupDTO";
import { removeItem } from "../../../../helpers/functions";
import { axiosPrivate } from "../../../../token/axiosPrivate";
import "./MemberInfo.css";

export default function MemberInfo({
  groupMember,
  setGroupMember,
  role,
  memberDTO,
  owner
}: {
  groupMember: GroupInfoDTO;
  setGroupMember: React.Dispatch<React.SetStateAction<GroupInfoDTO>>;
  role: Number;
  memberDTO: MemberDTO;
  owner: boolean;
}) {
  const roleOptions = [
    { value: 1, label: "Co-owner" },
    { value: 2, label: "Member" }
  ];

  const kick = (event: React.MouseEvent<HTMLElement>) => {
    const kickReq: ModifyGroupDTO = {
      id: groupMember.id,
      role,
      memberId: memberDTO.id
    };
    axiosPrivate({
      method: "delete",
      url: `${process.env.REACT_APP_API_SERVER}/group/member/`,
      data: kickReq
    }).then((response) => {
      if (response.status === 200) {
        if (role === 1) removeItem(groupMember.coowner, memberDTO);
        else removeItem(groupMember.member, memberDTO);
        alert("User has been deleted");
        setGroupMember(groupMember);
      } else {
        // eslint-disable-next-line no-alert
        alert(response);
      }
    });
  };
  function setRoleMember(event: any) {
    const newRole = event.value;
    if (newRole !== role) {
      const updateReq: ModifyGroupDTO = {
        id: groupMember.id,
        role,
        memberId: memberDTO.id
      };
      axiosPrivate({
        method: "put",
        url: `${process.env.REACT_APP_API_SERVER}/group/member/`,
        data: updateReq
      }).then((response) => {
        if (response.status === 200) {
          if (role === 1) {
            removeItem(groupMember.coowner, memberDTO);
            groupMember.member.push(memberDTO);
          } else {
            removeItem(groupMember.member, memberDTO);
            groupMember.coowner.push(memberDTO);
          }
          alert("User has been modify role");
          setGroupMember(groupMember);
        } else {
          // eslint-disable-next-line no-alert
          alert(response);
        }
      });
    }
  }
  return (
    <Row className="member">
      <Col lg={2}>
        <Image className="ava" fluid src="/assets/profileAvatar.png" />
      </Col>
      <Col lg={4} className="member-row">
        <p className="role-text">{role === 1 ? "Co-owner" : "Member"}</p>
        <p className="name-text">{memberDTO.email}</p>
      </Col>
      <Col lg={1} className="member-row">
        <Button type="button" className="iconBtn">
          <FaInfo className="icon" />
        </Button>
      </Col>
      {owner && (
        <Col lg={4} className="role-assign">
          <Select
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderRadius: "20px"
              })
            }}
            options={roleOptions}
            defaultValue={roleOptions.find((r) => r.value === role)}
            onChange={(newRole) => setRoleMember(newRole)}
          />
          <Button onClick={kick} variant="danger" style={{ width: "100px" }}>
            Kick
          </Button>
        </Col>
      )}
    </Row>
  );
}
