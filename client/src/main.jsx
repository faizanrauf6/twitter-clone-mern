import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import StateContextProvider from "./contexts/StateContextProvider";
import ErrorBoundary from "./components/Base/ErrorBoundry";
import "nprogress/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
const rootElement = document.querySelector("#root");

const root = createRoot(rootElement);

root.render(
  <StateContextProvider>
    <ErrorBoundary>
      <App />
      <ToastContainer position="top-right" autoClose={5000} />
    </ErrorBoundary>
  </StateContextProvider>
);
