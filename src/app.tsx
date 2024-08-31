import { Route, Routes } from "react-router-dom";
import Sheet from "./features/sheet/sheet";
import AuthDialog from "./features/auth/auth_screen";

function App() {
    return (
        <>
            <Routes>
                <Route path="/auth" element={<AuthDialog></AuthDialog>} />
            </Routes>
            <Sheet></Sheet>
        </>
    );
}

export default App;
