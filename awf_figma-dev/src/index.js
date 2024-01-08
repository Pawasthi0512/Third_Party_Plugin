import React from "react";
import { createRoot } from "react-dom/client";
import { CustomMuiThemeProvider } from "./app/Utiles/theme";
import App from "./app/App";
import "./index.css";
import {
  ProvideAuth,
  ProvieTasks,
  ProvideGuideline,
  ProvideAssets,
  SnackBarProvider,
} from "./app/Utiles/hooks";

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("root");
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <SnackBarProvider>
        <ProvideAuth>
          <ProvideAssets>
            <ProvideGuideline>
              <ProvieTasks>
                <CustomMuiThemeProvider>
                  <App />
                </CustomMuiThemeProvider>
              </ProvieTasks>
            </ProvideGuideline>
          </ProvideAssets>
        </ProvideAuth>
      </SnackBarProvider>
    </React.StrictMode>
  );
});
