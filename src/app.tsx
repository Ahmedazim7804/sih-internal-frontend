import { Route, Routes } from "react-router-dom";
import Sheet from "./features/sheet/sheet";
import AuthScreen from "./features/auth/auth_screen";

function App() {
    return (
        <>
            <Routes>
                <Route path="/auth" element={<AuthScreen></AuthScreen>} />
                <Route path="/" element={<Sheet></Sheet>}></Route>
            </Routes>
            <Sheet></Sheet>
        </>
    );
}

export default App;
