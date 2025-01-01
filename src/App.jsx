import "./App.css";
import MovementsTable from "./components/MovementsTable";
import MovementsAddModalDialog from "./components/MovementsAddModalDialog";

function App() {
  return (
    <>
      <h1>Fitness Tracker</h1>
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
    </>
  );
}

export default App;
