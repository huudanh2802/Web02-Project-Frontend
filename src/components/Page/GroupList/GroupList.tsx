import { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Row,
  Spinner,
  Tab,
  Tabs
} from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GroupDTO from "../../../dtos/GroupDTO";
import { axiosPrivate } from "../../../token/axiosPrivate";
import PresentationTab from "./Components/PresentationTab";
import ViewPresentationDTO from "../../../dtos/ViewPresentationDTO";

import GroupKard from "../../Common/Kard/GroupKard";

import "../../Common/Toast/ToastStyle.css";

function GroupList() {
  const [ownGroup, setOwnGroup] = useState<GroupDTO[]>([]);
  const [memberGroup, setMemberGroup] = useState<GroupDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [presentationsOwn, setPresentationsOwn] = useState<
    ViewPresentationDTO[]
  >([]);
  const [presentationsCollabs, setPresentationsCollabs] = useState<
    ViewPresentationDTO[]
  >([]);
  function getOwnGroup() {
    const id = localStorage.getItem("id");
    setLoading(true);
    axiosPrivate
      .get(`${process.env.REACT_APP_API_SERVER}/group/owngroup/${id}`)
      .then((response: any) => {
        setOwnGroup(response.data);
      })
      .catch((error: any) => {
        toast.error(error.response.data.error, {
          className: "toast_container"
        });
      })
      .finally(() => setLoading(false));
  }

  function getMemberGroup() {
    const id = localStorage.getItem("id");
    setLoading(true);
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
      })
      .finally(() => setLoading(false));
  }

  function getPresentationOwn() {
    const id = localStorage.getItem("id");
    setLoading(true);
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/presentation/presentationown/${id}`
    })
      .then((response) => {
        setPresentationsOwn(response.data);
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      })
      .finally(() => setLoading(false));
  }
  function getPresentationCollabs() {
    const id = localStorage.getItem("id");
    setLoading(true);
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/presentation/presentationcollabs/${id}`
    })
      .then((response) => {
        setPresentationsCollabs(response.data);
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      })
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    getOwnGroup();
    getMemberGroup();
    getPresentationOwn();
    getPresentationCollabs();
  }, []);

  return (
    <Container>
      {loading && <Spinner animation="border" />}
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
            presentationsOwn={presentationsOwn}
            setPresentationsOwn={setPresentationsOwn}
            presentationsCollabs={presentationsCollabs}
          />
        </Tab>
      </Tabs>
    </Container>
  );
}

export default GroupList;
