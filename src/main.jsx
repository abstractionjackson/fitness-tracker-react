import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { DbProvider } from "./hooks/useDb.jsx";
import { MovementsProvider } from "./hooks/useMovements.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DbProvider>
      <MovementsProvider>
        <App />
      </MovementsProvider>
    </DbProvider>
  </StrictMode>
);
