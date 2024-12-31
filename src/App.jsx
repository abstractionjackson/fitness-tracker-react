import "./App.css";
import MovementsTable from "./components/MovementsTable";
import MovementsAddModalDialog from "./components/MovementsAddModalDialog";

function App() {
  return (
    <>
      <h1>Fitness Tracker</h1>
      <section>
        <header>
          <h2>Movements</h2>
        </header>
        <main>
          <MovementsAddModalDialog text={"New Movement"} />
          <MovementsTable />
        </main>
      </section>
    </>
  );
}

export default App;
