/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import {
  UseFormRegister,
  UseFormHandleSubmit,
  FieldValues
} from "react-hook-form";
import { PresentationDTOV2 } from "../../../../dtos/PresentationDTO";

function NameModal({
  show,
  handleClose,
  detailPresentation,
  setPresentation,
  registerName,
  handleSubmitName
}: {
  show: boolean;
  handleClose: () => void;
  detailPresentation: PresentationDTOV2;
  setPresentation: React.Dispatch<React.SetStateAction<PresentationDTOV2>>;
  registerName: UseFormRegister<FieldValues>;
  handleSubmitName: UseFormHandleSubmit<FieldValues>;
}) {
  const onSubmit = (data: any) => {
    const nameData = data.name;
    setPresentation((presentation) => ({
      ...presentation,
      name: nameData
    }));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Update Presentation name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmitName(onSubmit)}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="text-center" style={{ fontWeight: "bold" }}>
              Presentation Name
            </Form.Label>
            <Form.Control
              type="name"
              defaultValue={detailPresentation.name}
              {...registerName("name", { required: true })}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" type="submit">
              Update
            </Button>
            <Button variant="outline-dark" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default NameModal;
