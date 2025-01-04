import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { MovementsProvider } from "./hooks/useMovements.jsx";
import MovementDetailPage from "./containers/MovementDetailPage.jsx";
// import { getDb } from "./db.js";

// const db = await getDb();
// await db.exec(`DROP TABLE IF EXISTS movements`);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MovementsProvider>
      <Router basename="/fitness-tracker-react">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:movement" element={<MovementDetailPage />} />
        </Routes>
      </Router>
    </MovementsProvider>
  </StrictMode>
);
