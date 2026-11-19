import { createRoot } from "react-dom/client";
import "./bootstrap.scss";
import "../../css/tokens.css";
import "./styles.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
