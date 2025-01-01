import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getDb } from "../db";

const defaultMovementsContextValue = {
  movements: [],
  setMovements: () => null,
  addMovement: async () => null,
  deleteMovement: async () => null,
};

const MovementsContext = createContext(defaultMovementsContextValue);

// eslint-disable-next-line react-refresh/only-export-components
export const useMovements = () => useContext(MovementsContext);

export const MovementsProvider = ({ children }) => {
  const [db, setDb] = useState(null);
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    const fetchMovements = async () => {
      const result = await db.exec({
        sql: "SELECT * FROM movements",
        returnValue: "resultRows",
        rowMode: "object",
      });
      setMovements(result);
    };
    if (db) fetchMovements();

    const fetchDb = async () => {
      const db = await getDb();
      setDb(db);
    };
    if (!db) fetchDb();
  }, [db]);

  async function addMovement(name, weight, date) {
    try {
      const result = await db.exec({
        sql: "INSERT INTO movements (name, weight, date) VALUES (?, ?, ?) RETURNING *",
        bind: [name, weight, date],
        returnValue: "resultRows",
        rowMode: "object",
      });
      const newMovement = result[0];
      setMovements([...movements, newMovement]);
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteMovement(id) {
    try {
      await db.exec({
        sql: "DELETE FROM movements WHERE id = ?",
        bind: [id],
      });
      setMovements(movements.filter(movement => movement.id !== id));
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <MovementsContext.Provider
      value={{ movements, setMovements, addMovement, deleteMovement }}
    >
      {children}
    </MovementsContext.Provider>
  );
};

MovementsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
