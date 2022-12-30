/* eslint-disable no-unused-vars */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function ConfirmModal({
  handleClose,
  handleConfirm,
  show
}: {
  handleClose: (event: any) => void;
  handleConfirm: (event: any) => void;
  show: boolean;
}) {
  return (
    <div className="modal show" style={{ zIndex: "99" }}>
      <Modal show={show}>
        <Modal.Header closeButton />

        <Modal.Body>
          <p>Are you sure you wanna delete this item.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
