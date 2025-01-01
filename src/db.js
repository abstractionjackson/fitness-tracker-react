import sqlite3InitModule from "@sqlite.org/sqlite-wasm";

const { log, error } = console;

export const getDb = async () => {
  const sqlite3 = await sqlite3InitModule({
    print: log,
    printErr: error,
  });
  return new sqlite3.oo1.JsStorageDb("local");
};

export const initDb = async () => {
  try {
    const db = await getDb();
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
