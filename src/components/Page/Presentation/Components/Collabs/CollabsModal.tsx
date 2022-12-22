/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { Button, Modal } from "react-bootstrap";

import CollabsSelect from "./CollabsSelect";

const roleOptions = [
  { value: 3, label: "Select..." },
  { value: 4, label: "Co-owner" },
  { value: 1, label: "Co-owner" },
  { value: 5, label: "Co-owner" },
  { value: 6, label: "Co-owner" },
  { value: 10, label: "Co-owner" },
  { value: 13, label: "Co-owner" },
  { value: 14, label: "Co-owner" },
  { value: 11, label: "Co-owner" },
  { value: 12, label: "Co-owner" },
  { value: 19, label: "Co-owner" },
  { value: 18, label: "Co-owner" },
  { value: 2, label: "Member" }
];

export default function CollabsModal({
  showCollabs,
  handleCloseCollabs
}: {
  showCollabs: boolean;
  handleCloseCollabs: () => void;
}) {
  return (
    <Modal
      show={showCollabs}
      onHide={handleCloseCollabs}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Manage Collaborators</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CollabsSelect handleCloseCollabs={handleCloseCollabs} />
      </Modal.Body>
    </Modal>
  );
}
