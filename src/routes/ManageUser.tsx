/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable no-unused-vars */
import { Card, Col, Container, Row } from "react-bootstrap";

export default function ManageUser() {
  const propsData = {
    groupCard: {
      groupName: "Advanced Web App Development",
      groupOwner: "by Tran Van B"
    },
    groupCard2: {
      groupName: "Internet of Things",
      groupOwner: "by Tran Van C"
    },
    groupCard4: {
      groupName: "Database Fundamentals",
      groupOwner: "by Le Thi C"
    },
    groupCard6: {
      groupName: "Object-oriented Programming",
      groupOwner: "by Nong Chi To"
    },
    groupCard1: {
      groupName: "Programming Techniques",
      groupOwner: "by Uong Van H"
    },
    groupCard3: {
      groupName: "Mobile Development",
      groupOwner: "by Doan Thi J"
    },
    groupCard5: {
      groupName: "Study Group 19CLC5",
      groupOwner: "by Do Van Z"
    }
  };
  return (
    <>
      <Container
        style={{
          background: "#318F9B",
          width: "1312px",
          height: "300px",
          display: "flex",
          alignItems: "center"
        }}
      >
        <Container
          style={{
            background: "white",
            width: "1312px",
            height: "227px",
            borderRadius: "32px"
          }}
        >
          <Row>
            <Col xs={4}>
              <img src="assets/profilePicture.svg" />
            </Col>
            <Col>
              <Row style={{ marginTop: "50px" }}>
                <span style={{ fontWeight: "bold", fontSize: "22px" }}>
                  Nguyen Van A
                </span>
              </Row>
              <Row>
                <span>August 5th, 2021 | Male | Student</span>
              </Row>
              <Row>
                <span>Joined 5 groups</span>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>

      <h5>Groups</h5>
      <Row>
        <Col xs={3}>
          <Card>
            <Card.Img
              variant="top"
              src="./assets/frame7.png"
              style={{
                width: "316px",
                height: "169px"
              }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
}
