/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import CopyToClipboard from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import { axiosPrivate } from "../../../../token/axiosPrivate";
import GroupInfoDTO from "../../../../dtos/GroupInfoDTO";
import "react-toastify/dist/ReactToastify.css";

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
  const onSubmit = (data: any) => {
    const email = data;
    axiosPrivate({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/group/invitebyemail/${groupId}`,
      data: email
    })
      .then((response: any) => {
        toast(response.data, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      })
      .catch((err: any) => {
        toast.error(err.response.data.error, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          theme: "light"
        });
      });
  };

  return (
    <>
      <ToastContainer />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Invite user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label
                className="text-center"
                style={{ fontWeight: "bold" }}
              >
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
    </>
  );
}

export default InviteModal;
