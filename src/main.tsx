import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import { DataProvider } from "./context/DataProvider";
import { SidebarProvider } from "./context/SidebarProvider";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <DataProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </DataProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
