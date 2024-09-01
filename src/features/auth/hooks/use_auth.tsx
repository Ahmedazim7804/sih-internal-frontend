import { IUser } from "../interfaces/user_interface";
import { useAuthContext } from "../providers/auth_provider";

export default function useAuth() {
    const { setUser } = useAuthContext();

    async function getUserDetails(token: string): Promise<IUser | null> {
        try {
            const response = await fetch(
                "https://sih-internal-backend-pm7h.onrender.com/auth/user",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                return null;
            }

            return {
                name: data.user.name,
                email: data.user.email,
                token: token,
                userId: data.user.id,
            };
        } catch {
            return null;
        }
    }

    async function signUp({
        values,
    }: {
        values: {
            name: string;
            password: string;
            email: string;
        };
    }): Promise<string | null> {
        try {
            const response = await fetch(
                "https://sih-internal-backend-pm7h.onrender.com/auth/signup",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: values.name,
                        password: values.password,
                        email: values.email,
                    }),
                }
            );
            const data = await response.json();

            if (!response.ok || !data.success) {
                return "There is some problem in creating your account.";
            }

            localStorage.setItem("token", data.token);

            const user: IUser | null = await getUserDetails(data.token);

            if (user == null) {
                return "There is some problem in creating your account.";
            }

            setUser(user);

            return null;
        } catch {
            return "There is some problem in creating your account.";
        }
    }

    async function signIn({
        values,
    }: {
        values: { email: string; password: string };
    }): Promise<string | null> {
        try {
            const response = await fetch(
                "https://sih-internal-backend-pm7h.onrender.com/auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        password: values.password,
                        email: values.email,
                    }),
                }
            );
            const data = await response.json();

            if (!response.ok || !data.success) {
                return "There is some problem in logging in.";
            }

            localStorage.setItem("token", data.token);

            const user: IUser | null = await getUserDetails(data.token);

            if (user == null) {
                return "There is some problem in creating your account.";
            }

            setUser(user);

            return null;
        } catch {
            return "There is some problem in logging in.";
        }
    }
    async function signOut() {}

    return {
        signIn,
        signUp,
        signOut,
    };
}
