import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { BusinessProvider } from "./context/context.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <BusinessProvider>
      <Toaster />
      <App />
    </BusinessProvider>
  </BrowserRouter>
);
