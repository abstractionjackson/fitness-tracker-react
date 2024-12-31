import { useState, useRef } from "react";
import { useMovements } from "../hooks/useMovements";

const MovementsAddModalDialog = props => {
  const [name, setName] = useState(props.name);
  const [weight, setWeight] = useState(props.weight);
  const [date, setDate] = useState(props.date);
  const { addMovement } = useMovements();
  const dialogRef = useRef(null);

  const handleClose = () => dialogRef.current.close();
  const handleShow = () => dialogRef.current.showModal();

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
      <button onClick={handleShow}>{props.text || "+"}</button>

      <dialog ref={dialogRef}>
        <form onSubmit={handleSubmit}>
          <h2>Add {props.name || "New Movement"}</h2>
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

export default MovementsAddModalDialog;
