import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "@cloudscape-design/global-styles/index.css";

import { applyMode, Mode, applyDensity, Density } from "@cloudscape-design/global-styles";

import App from './App';
import { ProgressProvider } from './context/ProgressContext';
import { workshop } from './data/workshop';
import { applyCustomTheme } from './theme';
import "./styles/index.css"; 


// Apply density before rendering
applyDensity(Density.Comfortable);

// Apply custom theme before rendering
applyCustomTheme();

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ProgressProvider workshopId={workshop.id}>
                <App />
            </ProgressProvider>
        </BrowserRouter>
    </React.StrictMode>
);