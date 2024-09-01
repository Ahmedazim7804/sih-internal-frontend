import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SheetProvider } from "./features/sheet/providers/sheet_provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <SheetProvider>
                <></>
                <BrowserRouter>
                    <App></App>
                    {/* <Routes>
                <Route path="/*" element={<App></App>}></Route>
            </Routes> */}
                </BrowserRouter>
            </SheetProvider>
        </QueryClientProvider>
    </StrictMode>
);
