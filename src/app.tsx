import { Route, Routes } from "react-router-dom";
import SheetComponent from "./features/sheet/sheet";
import AuthDialog from "./features/auth/auth_screen";
import { SheetProvider } from "./features/sheet/providers/sheet_provider";

function App() {
    return (
        <>
            <Routes>
                <Route path="/auth" element={<AuthDialog></AuthDialog>} />
            </Routes>
            <SheetProvider>
                <></>
                <SheetComponent></SheetComponent>
            </SheetProvider>
        </>
    );
}

export default App;
