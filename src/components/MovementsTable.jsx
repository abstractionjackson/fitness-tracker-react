import { useMovements } from "../hooks/useMovements";
import DeleteMovementButton from "./DeleteMovementButton";
import MovementsAddModalDialog from "./MovementsAddModalDialog";

const MovementsTable = () => {
  const { movements } = useMovements();
  const maxWeightMovements = movements.reduce((acc, movement) => {
    const existingMovement = acc.find(m => m.name === movement.name);
    if (!existingMovement || movement.weight > existingMovement.weight) {
      return acc.filter(m => m.name !== movement.name).concat(movement);
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
  return (
    <table>
      <thead>
        <tr>
          <th>Actions</th>
          <th>Name</th>
          <th>Weight</th>
          <th>Date</th>
          <th>Is Recent</th>
        </tr>
      </thead>
      <tbody>
        {maxWeightMovements.map(movement => (
          <tr key={movement.id}>
            <td>
              <MovementsAddModalDialog
                name={movement.name}
                weight={movement.weight}
                date={movement.date}
              />
              <DeleteMovementButton id={movement.id} />
            </td>
            <td>{movement.name}</td>
            <td>{movement.weight}</td>
            <td>{movement.date}</td>
            <td>{isRecent(movement.date) ? "T" : "F"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MovementsTable;
