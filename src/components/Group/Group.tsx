/* eslint-disable */
import { Row, Col, Card, Container, Form } from "react-bootstrap";
import { GroupCreatedData } from "./GroupCreatedData";
import { GroupJoinedData } from "./GroupJoinedData";
import { useState } from "react";

function Group() {
  const [selected, setSelected] = useState("");
  const handleChange = (event: any) => {
    setSelected(event.target.value);
  };

  return (
    <>
      <Container
        style={{
          padding: "24px 0 16px 8px",
          display: "flex",
          maxWidth: "800px",
          justifyContent: "space-around"
        }}
      >
        <Form>
          <Form.Control type="input" placeholder="Search for group... " />
        </Form>
        <select value={selected} onChange={handleChange}>
          <option value="">---Sort by---</option>
          <option value="name">Group Name</option>
          <option value="date">Date</option>
        </select>
      </Container>

      <Container style={{ maxWidth: "700px", padding: "8px 0 8px 8px" }}>
        <h5 style={{ color: "#4AB2C9", fontWeight: "bold" }}>Created</h5>
        <Row>
          {GroupCreatedData.map((group, index) => {
            return (
              <>
                <Card key={index}>
                  <Card.Body>
                    <Row>
                      <Col xs={3}>
                        <Card.Img
                          src={group.groupAvaSrc}
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </Col>
                      <Col xs={6}>
                        <Card.Link
                          href={`/grouplist/${group.groupId}`}
                          style={{ color: "#389CB2", fontWeight: "bold" }}
                        >
                          {group.groupName}
                        </Card.Link>
                        <Card.Text>
                          <Card.Img
                            src="assets/groupChat1.png"
                            style={{ width: "35px", height: "35px" }}
                          ></Card.Img>
                          {group.numMembers} Members{" "}
                          <Card.Img
                            src="assets/iconClock.svg"
                            style={{ width: "25px", height: "25px" }}
                          ></Card.Img>
                          {group.createDate}
                        </Card.Text>
                        <Row>
                          {GroupCreatedData[index].membersAva
                            .slice(0, 3)
                            .map((m) => (
                              <Col xs={1}>
                                <Card.Img
                                  src={m.imgSrc}
                                  style={{ width: "25px", height: "25px" }}
                                ></Card.Img>
                              </Col>
                            ))}
                          <Col xs={4}>
                            <Card.Text>have joined</Card.Text>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </>
            );
          })}
        </Row>
      </Container>

      <Container style={{ maxWidth: "700px", padding: "8px 0 8px 8px" }}>
        <h5 style={{ color: "#4AB2C9", fontWeight: "bold" }}>Joined</h5>
        <Row>
          {GroupJoinedData.map((group, index) => {
            return (
              <>
                <Card key={index}>
                  <Card.Body>
                    <Row>
                      <Col xs={3}>
                        <Card.Img
                          src={group.groupAvaSrc}
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </Col>
                      <Col xs={6}>
                        <Card.Link
                          href={`/grouplist/${group.groupId}`}
                          style={{ color: "#389CB2", fontWeight: "bold" }}
                        >
                          {group.groupName}
                        </Card.Link>
                        <Card.Text>
                          <Card.Img
                            src="assets/groupChat1.png"
                            style={{ width: "35px", height: "35px" }}
                          ></Card.Img>
                          {group.numMembers} Members{" "}
                          <Card.Img
                            src="assets/iconClock.svg"
                            style={{ width: "25px", height: "25px" }}
                          ></Card.Img>
                          {group.createDate}
                        </Card.Text>
                        <Row>
                          {GroupJoinedData[index].membersAva
                            .slice(0, 3)
                            .map((m) => (
                              <Col xs={1}>
                                <Card.Img
                                  src={m.imgSrc}
                                  style={{ width: "25px", height: "25px" }}
                                ></Card.Img>
                              </Col>
                            ))}
                          <Col xs={4}>
                            <Card.Text>have joined</Card.Text>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Group;
