import "./App.css";
import MovementsTable from "./components/MovementsTable";
import MovementsAddModalDialog from "./components/MovementsAddModalDialog";
import { useEffect } from "react";
import { initDb } from "./db";

function App() {
  useEffect(() => {
    initDb();
  });
  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <header>
        <h1>🏋🏻‍♂️Personal Records</h1>
        <p>
          Track your best lifts by movement. Click <i>New</i> to add a movement,
          or select an existing movement to view your lifts by date.{" "}
        </p>
      </header>
      <main>
        <section>
          <header
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "auto",
            }}
          >
            <h2>Movements by Date and Max Weight</h2>
            <MovementsAddModalDialog text={"New"} />
          </header>
          <main>
            <MovementsTable />
          </main>
        </section>
      </main>
      <footer style={{ marginTop: "auto" }}>
        Copyright 2025 abstractionjackson
      </footer>
    </div>
  );
}

export default App;
