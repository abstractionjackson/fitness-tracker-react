import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { useMovements } from "../hooks/useMovements";

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
  const dialogRef = useRef(null);
  const weightInputRef = useRef(null);

  const handleClose = () => dialogRef.current.close();
  const handleShow = () => {
    dialogRef.current.showModal();
    if (initialName && initialWeight) {
      weightInputRef.current.focus();
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await addMovement(name, weight, date);
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
      <button onClick={handleShow}>{text}</button>

      <dialog ref={dialogRef}>
        <form onSubmit={handleSubmit}>
          <h2>Add {nameLabel}</h2>
          <div className="form-group">
            <label htmlFor="formName">Name</label>
            <input
              type="text"
              id="formName"
              placeholder="Enter movement name"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="formWeight">Weight</label>
            <input
              type="number"
              id="formWeight"
              placeholder="Enter weight"
              value={weight}
              ref={weightInputRef}
              onChange={e => setWeight(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="formDate">Date</label>
            <input
              type="date"
              id="formDate"
              value={date}
              onChange={e => setDate(e.target.value)}
              required
            />
          </div>

          <button type="submit">Submit</button>
          <button type="button" onClick={handleClose}>
            Close
          </button>
        </form>
      </dialog>
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
