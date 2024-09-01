import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SheetProvider } from "./context/sheet_provider.tsx";
import AuthProvider from "./context/auth_provider.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(

            // <AuthProvider>
        <QueryClientProvider client={queryClient}>

            <SheetProvider>
                <></>
                <BrowserRouter>
                    <AuthProvider>
                        <App></App>
                        {/* <Routes>
                <Route path="/*" element={<App></App>}></Route>
            </Routes> */}
                    </AuthProvider>
                </BrowserRouter>
            </SheetProvider>
        </QueryClientProvider>
            // </AuthProvider>

);
