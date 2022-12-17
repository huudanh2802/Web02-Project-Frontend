import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Tab, Tabs } from "react-bootstrap";
import GroupKard from "../../Common/Kard/GroupKard";
import GroupDTO from "../../../dtos/GroupDTO";
import { axiosPrivate } from "../../../token/axiosPrivate";
import PresentationTab from "../GroupDetail/Components/PresentationTab";
import ViewPresentationDTO from "../../../dtos/ViewPresentationDTO";

function GroupList() {
  const [ownGroup, setOwnGroup] = useState<GroupDTO[]>([]);
  const [memberGroup, setMemberGroup] = useState<GroupDTO[]>([]);
  const [presentations, setPresentations] = useState<ViewPresentationDTO[]>([]);
  function getOwnGroup() {
    const id = localStorage.getItem("id");

    axiosPrivate
      .get(`${process.env.REACT_APP_API_SERVER}/group/owngroup/${id}`)
      .then((response: any) => {
        setOwnGroup(response.data);
      })
      .catch((error: any) => {
        console.log(error.response.data.error);
      });
  }

  function getMemberGroup() {
    const id = localStorage.getItem("id");

    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/group/membergroup/${id}`
    }).then((response: any) => {
      setMemberGroup(response.data);
    });
  }

  function getPresentation() {
    const id = localStorage.getItem("id");

    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/presentation/getview/${id}`
    }).then((response) => {
      setPresentations(response.data);
    });
  }
  useEffect(() => {
    getOwnGroup();
    getMemberGroup();
    getPresentation();
  }, []);

  return (
    <Container>
      <Tabs defaultActiveKey="created" id="group-list-tab" className="mb-3">
        <Tab eventKey="created" title="Created">
          <Button href="/group/newgroup" variant="primary">
            Create new Group
          </Button>
          <Row xs={1} md={2} lg={4} style={{ marginTop: "16px" }}>
            {ownGroup.map((group, index) => (
              <Col>
                <GroupKard group={group} index={index} />
              </Col>
            ))}
          </Row>
        </Tab>

        <Tab eventKey="joined" title="Joined">
          <Row xs={1} md={2} lg={4}>
            {memberGroup.map((group, index) => (
              <Col>
                <GroupKard group={group} index={index} />
              </Col>
            ))}
          </Row>
        </Tab>

        <Tab eventKey="presentation" title="Prensentation">
          <PresentationTab
            presentations={presentations}
            setPresentations={setPresentations}
          />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default GroupList;
