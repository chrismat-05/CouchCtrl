import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Ensure default theme is applied before React mounts
const preferred = localStorage.getItem("theme") || "dark";
if (preferred === "dark") document.documentElement.classList.add("dark");

createRoot(document.getElementById("root")).render(<App />);
