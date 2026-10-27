import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// Resolve router basename based on environment configuration:
// - GitHub Pages: "/Aman_Sayyad-Portfolio"
// - Vercel / Local dev: "/"
const rawBase =
  import.meta.env.VITE_BASE_PATH ||
  import.meta.env.BASE_URL ||
  "/";

const routerBasename =
  rawBase === "/" || rawBase === ""
    ? "/"
    : `/${rawBase.replace(/^\/+|\/+$/g, "")}`;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={routerBasename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
