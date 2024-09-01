// import { createContext, useContext, useState } from "react";
// import { IUser } from "../types";

// const AuthContext = createContext<{
//     user: IUser | null;
//     setUser: (user: IUser) => void;
// }>({
//     user: null,
//     setUser: () => {},
// });

// export function AuthProvider({ children }: { children: Array<JSX.Element> }) {
//     const [user, setUser] = useState<IUser | null>(null);

//     return (
//         <AuthContext.Provider
//             value={{
//                 user,
//                 setUser,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export function useAuthContext() {
//     return useContext(AuthContext);
// }

import { UserType } from "../types";

import { createContext, useContext, useEffect, useState } from "react";
import { useGetToken } from "../hooks/auth/useGetToken";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
    fetchUser: () => Promise<void>;
    logout: () => void;
    user: UserType | null;
};

export const AuthContext = createContext<AuthContextType>({
    fetchUser: async () => {},
    logout: () => {},
    user: null,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setuser] = useState<UserType | null>(null);
    const router = useNavigate();
    useEffect(() => {
        fetchUser();
    }, []);

    const getUserByToken = async ({ token }: { token: string }) => {
        const res = await fetch(
            "https://sih-internal-backend-pm7h.onrender.com/auth/user",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await res.json();
        if (!res.ok || !data.success) {
            return null;
        }
        return data.user;
    };

    const fetchUser = async () => {
        console.log("fetching user");
        // check if public or not

        const token = useGetToken();

        if (!token) {
            router("/auth");
            return;
        }
        const user: UserType | null = await getUserByToken({ token });

        if (!user) {
            localStorage.getItem("token");
            return;
        }
        console.log(user);

        setuser((value) => user);
    };
    const logout = () => {
        localStorage.removeItem("token");
        router("/auth");
        setuser(null);
    };
    return (
        <AuthContext.Provider value={{ fetchUser, user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;
export const useAuthContext = () => useContext(AuthContext);
