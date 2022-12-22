/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { Button, Modal } from "react-bootstrap";

import CollabsSelect from "./CollabsSelect";

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
