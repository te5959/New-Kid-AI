import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { ChildProvider } from "./context/ChildContext";
import "./styles/tailwind.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ChildProvider>
          <App />
        </ChildProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
