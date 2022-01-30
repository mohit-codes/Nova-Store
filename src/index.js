import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProductDataProvider } from "./Contexts/productsContext";
import { AuthProvider } from "./Contexts/authContext";
import { UserDataProvider } from "./Contexts/userDataContext";

ReactDOM.render(
  <React.StrictMode>
    <ProductDataProvider>
      <UserDataProvider>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </UserDataProvider>
    </ProductDataProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
