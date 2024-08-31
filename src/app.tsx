import { Route, Routes } from "react-router-dom";
import SheetComponent from "./features/sheet/sheet";
import AuthScreen from "./features/auth/auth_screen";

function App() {
    return (
        <>
            <Routes>
                <Route path="/auth" element={<AuthScreen></AuthScreen>} />
                <Route
                    path="/"
                    element={<SheetComponent></SheetComponent>}
                ></Route>
            </Routes>
            <SheetComponent></SheetComponent>
        </>
    );
}

export default App;
