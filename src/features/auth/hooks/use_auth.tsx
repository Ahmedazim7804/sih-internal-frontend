import { useAuthContext } from "../providers/auth_provider";

export default function useAuth() {
    const { setUser } = useAuthContext();

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

            localStorage.setItem("sihtoken", data.token);

            setUser({
                email: values.email,
                name: values.name,
                token: data.token,
                userId: "sdsd",
            });

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

            localStorage.setItem("sihtoken", data.token);

            console.log(data);

            setUser({
                email: values.email,
                name: "HELLO",
                token: data.token,
                userId: "sdsd",
            });

            return null;
        } catch (_) {
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
