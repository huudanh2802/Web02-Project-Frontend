/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import { DefaultEventsMap } from "@socket.io/component-emitter";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Socket } from "socket.io-client";
import CheckOwnerDTO from "../../../dtos/CheckOwnerDTO";
import GroupInfoDTO from "../../../dtos/GroupInfoDTO";
import { axiosPrivate } from "../../../token/axiosPrivate";

import "./GroupDetail.css";

import "react-toastify/dist/ReactToastify.css";
import "../../Common/Toast/ToastStyle.css";
import InviteModal from "./Components/InviteModal";
import MemberSection from "./Components/MemberSection";
import PresentationSection from "./Components/PresentationSection";
import ConfirmModal from "../../Common/ConfirmModal/ConfirmModal";

function GroupInfo({
  setGame,
  socket
}: {
  setGame: React.Dispatch<React.SetStateAction<string>>;
  socket: Socket<DefaultEventsMap, DefaultEventsMap>;
}) {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const [owner, setOwner] = useState(false);
  const [coowner, setCoowner] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseConfirm = () => setShowConfirm(false);
  const handleShowConfirm = () => setShowConfirm(true);

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
    setLoading(true);
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
      })
      .finally(() => setLoading(false));
  }

  function checkCoOwner(ownerId: string) {
    console.log("ha");
    const checkOwnerDTO: CheckOwnerDTO = {
      ownerId,
      groupId: groupId!
    };
    setLoading(true);
    axiosPrivate({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/group/checkcoowner/`,
      data: checkOwnerDTO
    })
      .then((response) => {
        setCoowner(response.data);
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
        navigate("/");
      })
      .finally(() => setLoading(false));
  }

  function getGroupMember() {
    setLoading(true);
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
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    const ownerId = localStorage.getItem("id");
    if (ownerId) {
      checkOwner(ownerId);
      checkCoOwner(ownerId);
    }
    getGroupMember();
  }, []);

  function removeGroup() {
    setLoading(true);
    axiosPrivate({
      method: "delete",
      url: `${process.env.REACT_APP_API_SERVER}/group/delete/${groupId}`
    })
      .then(() => {
        toast.success("Group succesfully deleted", {
          className: "toast_container"
        });
        navigate(`/`);
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      })
      .finally(() => setLoading(false));
  }
  return (
    <>
      {loading && (
        <div className="spinner-background">
          <Spinner animation="border" variant="light" />
        </div>
      )}
      <InviteModal
        show={show}
        handleClose={handleClose}
        groupId={groupId}
        groupMember={groupMember}
      />
      <ConfirmModal
        show={showConfirm}
        handleClose={handleCloseConfirm}
        handleConfirm={() => removeGroup()}
      />
      <Container>
        <Row>
          <Col lg={10}>
            <h1 className="page-title" style={{ marginBottom: "32px" }}>
              {groupMember.name}
            </h1>
          </Col>
          <Col>
            {owner && (
              <Button variant="danger" onClick={() => handleShowConfirm()}>
                Remove Group
              </Button>
            )}
          </Col>
        </Row>
        <hr className="my-3" />
        <PresentationSection
          setGame={setGame}
          socket={socket}
          owner={owner}
          coowner={coowner}
        />
        <hr className="my-3" />
        <MemberSection
          groupMember={groupMember}
          setGroupMember={setGroupMember}
          owner={owner}
          handleShow={handleShow}
        />
      </Container>
    </>
  );
}

export default GroupInfo;
