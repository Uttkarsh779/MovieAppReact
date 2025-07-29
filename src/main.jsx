import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Dropdown from "./Components/Partials/Dropdown.jsx";
import { store } from "./store/store.jsx";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      {/* <Dropdown /> */}
    </BrowserRouter>
  </Provider>
);
