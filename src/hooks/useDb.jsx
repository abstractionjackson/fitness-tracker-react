import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import sqlite3InitModule from "@sqlite.org/sqlite-wasm";

const { error } = console;

const initializeSQLite = async start => {
  try {
    const sqlite3 = await sqlite3InitModule({
      print: () => null,
      printErr: () => null,
    });
    start(sqlite3);
  } catch (err) {
    error("Initialization error:", err.name, err.message);
  }
};

const initDb = async db => {
  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS movements(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name NOT NULL,
        weight FLOAT NOT NULL,
        date DATE DEFAULT CURRENT_DATE
      );
      `);
  } catch (e) {
    console.error(e);
  }
};

const DbContext = createContext(null);

export const DbProvider = ({ children }) => {
  const [db, setDb] = useState(null);

  useEffect(() => {
    if (!db) {
      initializeSQLite(sqlite3 => {
        const database = new sqlite3.oo1.JsStorageDb("local");
        setDb(database);
        initDb(database);
      });
    }
  }, [db]);

  return <DbContext.Provider value={db}>{children}</DbContext.Provider>;
};
DbProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDb = () => {
  return useContext(DbContext);
};
