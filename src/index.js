import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProductsContextProvider } from "./Contexts/productsContext";

ReactDOM.render(
  <React.StrictMode>
    <ProductsContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProductsContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
