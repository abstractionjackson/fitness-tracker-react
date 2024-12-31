import PropTypes from "prop-types";
import { useMovements } from "../hooks/useMovements";

const DeleteMovementButton = ({ id }) => {
  const { deleteMovement } = useMovements();

  const handleDelete = () => {
    deleteMovement(id);
  };

  return <button onClick={handleDelete}>Delete</button>;
};
DeleteMovementButton.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DeleteMovementButton;
