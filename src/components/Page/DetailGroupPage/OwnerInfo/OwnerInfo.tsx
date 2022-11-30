/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import { FaInfo } from "react-icons/fa";
import { useNavigate } from "react-router";
import MemberDTO from "../../../../dtos/MemberDTO";
import "./OwnerInfo.css";

export default function OwnerInfo({ owner }: { owner: MemberDTO }) {
  const navigate = useNavigate();
  const redirectProfile = (event: any) => {
    console.log("Hello");
    navigate(`/group/profile/${owner.id}`);
  };
  return (
    <Row className="owner">
      <Col lg={2}>
        <Image
          // eslint-disable-next-line react/style-prop-object
          className="ava"
          fluid
          src="/assets/profileAvatar.png"
        />
      </Col>
      <Col lg={3} className="owner-row">
        <p className="owner-text">{owner.email}</p>
      </Col>
      <Col lg={3} className="owner-row">
        <Button type="button" className="iconBtn" onClick={redirectProfile}>
          <FaInfo className="icon" />
        </Button>
      </Col>
    </Row>
  );
}
