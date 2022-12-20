import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GroupDTO from "../../../dtos/GroupDTO";
import ViewPresentationDTO from "../../../dtos/ViewPresentationDTO";
import { axiosPrivate } from "../../../token/axiosPrivate";
import GroupKard from "../../Common/Kard/GroupKard";
import PresentationTab from "../GroupDetail/Components/PresentationTab";
import "../../Common/Toast/ToastStyle.css";

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
        toast.error(error.response.data.error, {
          className: "toast_container"
        });
      });
  }

  function getMemberGroup() {
    const id = localStorage.getItem("id");

    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/group/membergroup/${id}`
    })
      .then((response: any) => {
        setMemberGroup(response.data);
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      });
  }

  function getPresentation() {
    const id = localStorage.getItem("id");

    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/presentation/getview/${id}`
    })
      .then((response) => {
        setPresentations(response.data);
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
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
