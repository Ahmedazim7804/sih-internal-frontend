import { Route, Routes } from "react-router-dom";
import SheetComponent from "./features/sheet/sheet";
import AuthScreen from "./features/auth/auth_screen";
import ShareScreen from "./features/share/share_screen";
import DashboardScreen from "./features/dashboard/dashboard_screen";

function App() {
    return (
        <>
            <Routes>
                <Route path="/auth" element={<AuthScreen></AuthScreen>} />
                <Route path="/share" element={<ShareScreen />}></Route>
                <Route path="/dashboard" element={<DashboardScreen />}></Route>
            </Routes>
            {/* <SheetComponent></SheetComponent> */}
        </>
    );
}

export default App;
