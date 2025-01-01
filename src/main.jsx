import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { MovementsProvider } from "./hooks/useMovements.jsx";
import MovementDetailPage from "./containers/MovementDetailPage.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MovementsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/:movement" element={<MovementDetailPage />} />
        </Routes>
      </Router>
    </MovementsProvider>
  </StrictMode>
);
