import { useMovements } from "../hooks/useMovements";
import MovementsAddModalDialog from "./MovementsAddModalDialog";
import { Link } from "react-router-dom";
import { urlize } from "../utils";
import Table from "react-bootstrap/Table";

const MovementsTable = () => {
  // type Movement = { name, barbell_weight, dumbell_weight, machine_weight, date }
  const { movements } = useMovements();
  const maxWeightMovements = movements.reduce((acc, movement) => {
    const key = `${movement.name}-${movement.type}`;
    const existingMovement = acc.find(m => `${m.name}-${m.type}` === key);
    if (!existingMovement || movement.weight > existingMovement.weight) {
      return acc.filter(m => `${m.name}-${m.type}` !== key).concat(movement);
    }
    return acc;
  }, []);
  // const getRecentMovementCount = movementName => {
  //   const twoWeeksAgo = new Date();
  //   twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  //   return movements.filter(
  //     movement =>
  //       movement.name === movementName && new Date(movement.date) >= twoWeeksAgo
  //   ).length;
  // };
  const isRecent = date => {
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
    return new Date(date) > twoWeeksAgo;
  };
  function sortByDate(a, b) {
    return new Date(b.date) - new Date(a.date);
  }
  const formatDate = date => {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return maxWeightMovements.length < 1 ? (
    <p>Add a Movement to Get Started! 🏃🏻‍♂️</p>
  ) : (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Date</th>
          <th>Weight</th>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {maxWeightMovements.sort(sortByDate).map(movement => (
          <tr
            key={movement.id}
            style={{ color: isRecent(movement.date) ? "black" : "gray" }}
          >
            <td>{formatDate(movement.date)}</td>
            <td>{movement.weight}</td>
            <td>
              <Link to={`/${urlize(movement.name)}`}>{movement.name}</Link>
            </td>
            <td>
              <MovementsAddModalDialog
                name={movement.name}
                weight={movement.weight}
                date={movement.date}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default MovementsTable;
