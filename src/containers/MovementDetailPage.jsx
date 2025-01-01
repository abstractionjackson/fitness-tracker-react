import { useParams } from "react-router-dom";
import { useMovements } from "../hooks/useMovements";
import { urlize } from "../utils";

export default function MovementDetailPage() {
  const { movement } = useParams();
  const { movements } = useMovements();
  const currentMovement = movements.filter(m => urlize(m.name) === movement);
  const formattedName = currentMovement[0]?.name || movement;
  return (
    <section>
      <h2>{formattedName}</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {currentMovement.map(movement => (
            <tr key={movement.id}>
              <td>{movement.date}</td>
              <td>{movement.weight}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
