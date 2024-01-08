import React from "react";
import { createRoot } from "react-dom/client";
import { CustomMuiThemeProvider } from "./Utiles/theme";
import "./index.css";
import App from "./App";
import csInterface from "./CSInterface.js";
import {
  ProvideAuth,
  ProvieTasks,
  ProvideGuideline,
  ProvideAssets,
  SnackBarProvider,
} from "./Utiles/hooks";

document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("root") as HTMLElement;
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <SnackBarProvider>
        <ProvideAuth>
          <ProvideAssets>
            <ProvideGuideline>
              <ProvieTasks>
                <CustomMuiThemeProvider>
                  <App csInterface={csInterface} />
                </CustomMuiThemeProvider>
              </ProvieTasks>
            </ProvideGuideline>
          </ProvideAssets>
        </ProvideAuth>
      </SnackBarProvider>
    </React.StrictMode>
  );
});
