import { Route, Routes, useNavigate, redirect } from "react-router-dom";
import SheetComponent from "./pages/sheet/sheet";
import AuthScreen from "./pages/auth/auth_screen";
import ShareScreen from "./pages/share/share_screen";
import DashboardScreen from "./pages/dashboard/dashboard_screen";
import { useAuthContext } from "./context/auth_provider";
import { useEffect, useState } from "react";
import useAuth from "./hooks/use_auth";
import { ThreeDots } from "react-loader-spinner";

function App() {
    return (
        <>
            <Routes>
                <Route path="/auth" element={<AuthScreen></AuthScreen>} />
                <Route path="/share" element={<ShareScreen />}></Route>
                <Route path="/dashboard" element={<DashboardScreen />}></Route>
            </Routes>
            <SheetComponent></SheetComponent>
        </>
    );
}

export default App;
