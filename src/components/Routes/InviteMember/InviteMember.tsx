/* eslint-disable */
import { Row, Col, Card, Container, Form, Button } from "react-bootstrap";
import { GroupCreatedData } from "../../Group/GroupCreatedData";
import { useState } from "react";

export default function InviteMember() {
  const [link, setLink] = useState(false);
  const handleClick = () => setLink(true);

  return (
    <Container
      style={{
        maxWidth: "700px",
        height: "80vh",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Row>
        <Col>
          <h5 style={{ color: "#4AB2C9", fontWeight: "bold" }}>Your Group</h5>
          {GroupCreatedData.map((group, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Card key={index} style={{ width: "18rem" }}>
              <Card.Img variant="top" src={group.groupAvaSrc} />
              <Card.Body>
                <Card.Title>{group.groupName}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </Col>
        <Col>
          <h5 style={{ color: "#4AB2C9", fontWeight: "bold" }}>
            Create Invitation Link
          </h5>
          <Form.Group
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column"
            }}
          >
            <Form.Control
              placeholder="Invitation Link"
              disabled={!link}
              style={{ width: "300px" }}
            />
            <Button
              style={{
                marginTop: "10px",
                maxWidth: "160px",
                background: "#4AB2C9",
                borderColor: "white"
              }}
              onClick={handleClick}
            >
              {link ? "Success!" : "Generate"}
            </Button>
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
}
