import { Route, Routes } from "react-router-dom";
import SheetComponent from "./features/sheet/sheet";
import AuthScreen from "./features/auth/auth_screen";
import ShareScreen from "./features/share/share_screen";

function App() {
    return (
        <>
            <Routes>
                <Route path="/auth" element={<AuthScreen></AuthScreen>} />
                <Route path="/share" element={<ShareScreen />}></Route>
            </Routes>
            <SheetComponent></SheetComponent>
        </>
    );
}

export default App;
