/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { Key } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";
import GroupDTO from "../../../../dtos/GroupDTO";
import "./ListGroup.css";

export default function ListGroup({
  group,
  index
}: {
  group: GroupDTO;
  index: Key;
}) {
  const navigate = useNavigate();

  const viewGroup = (event: React.MouseEvent<HTMLElement>) => {
    const link = `/group/detail/${group.id.toString()}`;

    navigate(link);
  };

  return (
    <Card key={index}>
      <Card.Body>
        <Row className="group-row">
          <Col lg={3}>
            <Card.Img
              src="/assets/group1.png"
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
          </Col>
          <Col lg={6}>
            <Card
              style={{ color: "#389CB2", fontWeight: "bold", border: "none" }}
            >
              {group.name}
            </Card>
            <Card.Text>
              <Card.Img
                src="/assets/groupChat1.png"
                style={{ width: "35px", height: "35px" }}
              />
              {group.memberNum} Members{" "}
              <Card.Img
                src="/assets/iconClock.svg"
                style={{ width: "25px", height: "25px" }}
              />
              {group.createdAt.toString()}
            </Card.Text>
          </Col>
          <Col lg={3}>
            <Button variant="secondary" onClick={viewGroup}>
              View
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
