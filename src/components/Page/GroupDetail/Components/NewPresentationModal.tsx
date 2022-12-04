/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FaExclamationTriangle } from "react-icons/fa";
import { axiosPrivate } from "../../../../token/axiosPrivate";

function NewPresentationModal({
  showModal,
  handleClose,
  groupId
}: {
  showModal: boolean;
  handleClose: () => void;
  groupId: string | undefined;
}) {
  const formSchema = Yup.object().shape({
    name: Yup.string().required("Presentation name is required")
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const onSubmit = (data: any) => {
    const id = groupId;
    axiosPrivate({
      method: "post",
      url: `${process.env.REACT_APP_API_SERVER}/presentation/new`,
      data: {
        name: data.name,
        groupId: id
      }
    }).then(() => {
      alert(`Successfully created Presentation: "${data.name}"`);
      handleClose();
      window.location.reload();
    });
  };

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
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label className="text-center" style={{ fontWeight: "bold" }}>
              Presentation Name
            </Form.Label>
            <Form.Control
              type="text"
              {...register("name", { required: true })}
              placeholder="Example Presentation"
            />
          </Form.Group>
          {errors.name && (
            <p className="error">
              <FaExclamationTriangle className="mx-2" />
              Group&apos;s name is required
            </p>
          )}

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
