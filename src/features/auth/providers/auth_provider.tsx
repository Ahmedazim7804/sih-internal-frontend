import { createContext, useContext, useState } from "react";
import { IUser } from "../interfaces/user_interface";

const AuthContext = createContext<{
    user: IUser | null;
    setUser: (user: IUser) => void;
}>({
    user: null,
    setUser: () => {},
});

export function AuthProvider({ children }: { children: Array<JSX.Element> }) {
    const [user, setUser] = useState<IUser | null>(null);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    return useContext(AuthContext);
}
