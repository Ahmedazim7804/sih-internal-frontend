import { Route, Routes } from "react-router-dom";
import SheetComponent from "./pages/sheet/sheet";
import AuthScreen from "./pages/auth/auth_screen";
import ShareScreen from "./pages/share/share_screen";
import DashboardScreen from "./pages/dashboard/dashboard_screen";

function App() {
    return (
        <>
            <Routes>
                <Route path="/auth" element={<AuthScreen></AuthScreen>} />
                <Route path="/sheet/:id" element={<SheetComponent />} />
                <Route path="/share" element={<ShareScreen />}></Route>
                <Route path="/" element={<DashboardScreen />}></Route>
            </Routes>
            {/* <SheetComponent/> */}
        </>
    );
}

export default App;
