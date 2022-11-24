/* eslint-disable */

import { Row, Col, Card, Container } from "react-bootstrap";
import { GroupData } from "./GroupData";

import "./Group.css"

function Group() {
  return (
    <Container>
      {GroupData.map((group, index) => {
        return (
          <>
            <Card key={index}>
              <Col xs={6}>
                <Card.Body>
                  <Card.Img
                    src={group.groupAvaSrc}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </Card.Body>
              </Col>

              <Col xs={6}>
                <Card.Body>
                  <Card.Title>{group.groupName}</Card.Title>
                  <Card.Text>{group.createDate}</Card.Text>
                  <Card.Text>{group.numMembers} Members</Card.Text>
                </Card.Body>
              </Col>
            </Card>
          </>
        );
      })}
    </Container>
  );
}

export default Group;
