import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' instead of 'react-dom'
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

// Create a root using React 18's new root API
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

// Render your app inside the root
root.render(
  <Router>
    <App />
  </Router>
);
