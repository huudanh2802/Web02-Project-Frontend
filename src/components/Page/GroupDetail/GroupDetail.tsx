/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import CheckOwnerDTO from "../../../dtos/CheckOwnerDTO";
import GroupInfoDTO from "../../../dtos/GroupInfoDTO";
import { axiosPrivate } from "../../../token/axiosPrivate";

import "./GroupDetail.css";

import InviteModal from "./Components/InviteModal";
import MemberTab from "./Components/MemberTab";
// eslint-disable-next-line import/order
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../Common/Toast/ToastStyle.css";

function GroupInfo() {
  const { groupId } = useParams();
  const [owner, setOwner] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [groupMember, setGroupMember] = useState<GroupInfoDTO>({
    id: "",
    name: "",
    owner: {
      id: "",
      fullname: "",
      email: ""
    },
    coowner: [],
    member: []
  });

  function checkOwner(ownerId: string) {
    const checkOwnerDTO: CheckOwnerDTO = {
      ownerId,
      groupId: groupId!
    };
    axiosPrivate({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/group/checkowner/`,
      data: checkOwnerDTO
    })
      .then((response) => {
        setOwner(response.data);
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      });
  }

  function getGroupMember() {
    axiosPrivate({
      method: "get",
      url: `${process.env.REACT_APP_API_SERVER}/group/get/${groupId}`
    })
      .then((response) => {
        setGroupMember(response.data);
        console.log(response.data);
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      });
  }

  useEffect(() => {
    const ownerId = localStorage.getItem("id");
    if (ownerId) {
      checkOwner(ownerId);
    }
    getGroupMember();
  }, []);

  return (
    <>
      <InviteModal
        show={show}
        handleClose={handleClose}
        groupId={groupId}
        groupMember={groupMember}
      />
      <Container>
        <h1 className="page-title" style={{ marginBottom: "32px" }}>
          {groupMember.name}
        </h1>
        <Tabs defaultActiveKey="members" id="group-list-tab" className="mb-3">
          <Tab eventKey="members" title="Members">
            <MemberTab
              groupMember={groupMember}
              setGroupMember={setGroupMember}
              owner={owner}
              handleShow={handleShow}
            />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}

export default GroupInfo;
