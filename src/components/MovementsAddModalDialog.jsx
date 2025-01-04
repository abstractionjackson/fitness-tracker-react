import { useState } from "react";
import PropTypes from "prop-types";
import { useMovements } from "../hooks/useMovements";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const MovementsAddModalDialog = ({
  name: initialName = "",
  weight: initialWeight = 0,
  date: initialDate = "",
  text = "+",
  nameLabel = "New Movement",
}) => {
  const [name, setName] = useState(initialName);
  const [weight, setWeight] = useState(initialWeight);
  const [date, setDate] = useState(initialDate);
  const { addMovement } = useMovements();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async e => {
    e.preventDefault();
    const [year, month, day] = date.split("-");
    const isoDate = `${year}-${month}-${day}T00:00:00.000Z`;
    const tzOffset = new Date().getTimezoneOffset();
    const offsetDate = new Date(isoDate);
    offsetDate.setMinutes(offsetDate.getMinutes() + tzOffset);

    try {
      await addMovement(name, weight, offsetDate.toISOString());
      setName("");
      setWeight("");
      setDate("");
      handleClose();
    } catch (error) {
      console.error("Failed to add movement:", error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {text}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add {nameLabel}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter movement name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formWeight">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter weight"
                value={weight}
                onChange={e => setWeight(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="my-2">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

MovementsAddModalDialog.propTypes = {
  name: PropTypes.string,
  weight: PropTypes.number,
  date: PropTypes.string,
  text: PropTypes.string,
  nameLabel: PropTypes.string,
};

export default MovementsAddModalDialog;
