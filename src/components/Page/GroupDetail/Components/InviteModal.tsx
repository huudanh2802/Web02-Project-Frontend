/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { axiosPrivate } from "../../../../token/axiosPrivate";
import GroupInfoDTO from "../../../../dtos/GroupInfoDTO";
import "react-toastify/dist/ReactToastify.css";
import "../../../Common/Toast/ToastStyle.css";

function InviteModal({
  show,
  handleClose,
  groupId,
  groupMember
}: {
  show: boolean;
  handleClose: () => void;
  groupId: string | undefined;
  groupMember: GroupInfoDTO;
}) {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const onSubmit = (data: any) => {
    const email = data;
    setLoading(true);
    axiosPrivate({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/group/invitebyemail/${groupId}`,
      data: email
    })
      .then((response: any) => {
        toast(response.data, {
          className: "toast_container"
        });
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          className: "toast_container"
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      {loading && (
        <div
          style={{
            backgroundColor: "black",
            position: "fixed",
            top: "50%",
            left: "50%",
            width: "70px",
            height: "70px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: "0.6",
            borderRadius: "10px"
          }}
        >
          <Spinner animation="border" variant="light" />
        </div>
      )}
      <Modal.Header closeButton>
        <Modal.Title>Invite user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="text-center" style={{ fontWeight: "bold" }}>
              Email address
            </Form.Label>
            <Form.Control
              type="email"
              {...register("email", { required: true })}
              placeholder="name@example.com"
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Invite
            </Button>
            <CopyToClipboard
              text={`${process.env.REACT_APP_BASE_URL}/group/autojoin/${groupMember.id}`}
            >
              <Button
                variant="outline-dark"
                onClick={() => toast("Copied group's link to clipboard")}
              >
                Get Group&apos;s link
              </Button>
            </CopyToClipboard>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default InviteModal;
