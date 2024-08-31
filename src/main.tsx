import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <App></App>
            {/* <Routes>
                <Route path="/*" element={<App></App>}></Route>
            </Routes> */}
        </BrowserRouter>
    </StrictMode>
);
