import { Route, Routes, useNavigate, redirect } from "react-router-dom";
import SheetComponent from "./features/sheet/sheet";
import AuthScreen from "./features/auth/auth_screen";
import ShareScreen from "./features/share/share_screen";
import DashboardScreen from "./features/dashboard/dashboard_screen";
import { useAuthContext } from "./features/auth/providers/auth_provider";
import { useEffect, useState } from "react";
import useAuth from "./features/auth/hooks/use_auth";
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
