/* eslint-disable */
import { Col, Container, Row, Form, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import NewGroupDTO from "../../../dtos/NewGroupDTO";
import MemberRoleDTO from "../../../dtos/MemberRoleDTO";
import { useState } from "react";
import Menu from "../../Common/Menu/Menu";
import MemberRole from "../NewGroupPage/MemberRole/MemberRole";
import MemberSelection from "../NewGroupPage/MemberSelection/MemberSelection";

export function GroupInfo() {
  const { name } = useParams();
  const mockData = {
    id: "638398bb2797c4a83dc2bb04",
    email: "huudanh2802"
  };
  const [memberSelection, setMemberSelection] = useState<MemberRoleDTO[]>([]);

  const [newGroup, setNewGroup] = useState<NewGroupDTO>({
    name: "",
    owner: mockData,
    coowner: [],
    member: []
  });

  const memberRole = memberSelection.map((memberData) => (
    <li className="memberRole">
      <MemberRole
        memberData={memberData}
        add
        newGroup={newGroup}
        setNewGroup={setNewGroup}
      />
    </li>
  ));

  
  return (
    <>
      <Menu />
      <Container
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <h2 style={{ color: "#389CB2", marginBottom: "1rem", fontWeight: "bold", marginTop:"16px" }}>Group Info</h2>
        <Card>
          <Row className="mt-3">
            <Row className="mt-3">
              <Col xs={3} style={{marginLeft: "1rem"}}>
                <img src="/assets/group1.png" width={150} height={150}/>
              </Col>
              <Col>
                <Row>
                  <h5
                    style={{
                      color: "#389CB2",
                      fontWeight: "bold",
                      margin: "8px 0 8px 0"
                    }}
                  >
                    Group Name
                  </h5>
                </Row>
                <Form.Control placeholder={name} />
                <Row className="mt-3">
                  <h5
                    style={{
                      color: "#389CB2",
                      fontWeight: "bold",
                      margin: "8px 0 8px 0"
                    }}
                  >
                    Members
                  </h5>
                  <MemberSelection newGroup={newGroup} setNewGroup={setNewGroup} />
                </Row>
                <Row>
                  <Col>
                    <Button
                      size="sm"
                      variant="outline-success"
                      style={{
                        background: "green",
                        fontFamily: "Lato",
                        fontSize: "16px"
                      }}
                    >
                      Add Member
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      style={{
                        background: "red",
                        fontFamily: "Lato",
                        fontSize: "16px"
                      }}
                    >
                      Kick
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Row>
        </Card>
      </Container>
    </>
  );
}
