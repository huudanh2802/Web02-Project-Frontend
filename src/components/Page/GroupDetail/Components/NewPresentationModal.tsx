/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
// import { useForm } from "react-hook-form";
// import { axiosPrivate } from "../../../../token/axiosPrivate";

function NewPresentationModal({
  showModal,
  handleClose
}: {
  showModal: boolean;
  handleClose: () => void;
}) {
  // const { register, handleSubmit } = useForm();
  // const onSubmit = (data: any) => {
  //   const email = data;
  //   axiosPrivate({
  //     method: "post",
  //     url: `${process.env.REACT_APP_API_SERVER}/group/invitebyemail/${groupId}`,
  //     data: email
  //   }).then((response) => {
  //     alert(response.data);
  //   });
  // };

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
        <Modal.Title>Create new Presentation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="text-center" style={{ fontWeight: "bold" }}>
              Presentation Name
            </Form.Label>
            <Form.Control type="text" placeholder="Example Presentation" />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Create
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NewPresentationModal;
