/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";
import InviteDTO from "../../../../dtos/InviteDTO";

function InviteModal({
  inviteDTO,
  showModal,
  handleClose
}: {
  inviteDTO: InviteDTO;
  showModal: boolean;
  handleClose: () => void;
}) {
  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Invite user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={inviteDTO.handleSubmit(inviteDTO.onSubmit)}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="text-center" style={{ fontWeight: "bold" }}>
              Email address
            </Form.Label>
            <Form.Control
              type="email"
              {...inviteDTO.register("email", { required: true })}
              placeholder="name@example.com"
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Invite
            </Button>
            <CopyToClipboard
              text={`${process.env.REACT_APP_BASE_URL}/group/autojoin/${inviteDTO.groupMember.id}`}
            >
              <Button
                variant="outline-dark"
                onClick={() => alert("Copied group's link to clipboard")}
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
