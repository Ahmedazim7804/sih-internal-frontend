export default function useAuth() {
    // function isUserLoggedIn(): boolean {
    //     if (user == null) {
    //         return false;
    //     }

    //     if (user.token == null) {
    //         return false;
    //     }

    //     const decodedToken = jwtDecode(user.token);

    //     if (decodedToken.exp == null) {
    //         return false;
    //     }

    //     const dateNow = new Date();

    //     if (decodedToken.exp < dateNow.getTime()) {
    //         return false;
    //     }

    //     return true;
    // }

    // async function getUserDetails(token: string): Promise<boolean> {
    //     try {
    //         const response = await fetch(
    //             "https://sih-internal-backend-pm7h.onrender.com/auth/user",
    //             {
    //                 method: "GET",
    //                 headers: {
    //                     Authorization: `Bearer ${token}`,
    //                 },
    //             }
    //         );

    //         const data = await response.json();

    //         if (!response.ok || !data.success) {
    //             return false;
    //         }

    //         const userData = {
    //             name: data.user.name,
    //             email: data.user.email,
    //             token: token,
    //             userId: data.user.id,
    //         };
    //         setUser(userData);
    //         return true;
    //     } catch {
    //         return false;
    //     }
    // }

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

            return null;
        } catch {
            return "There is some problem in logging in.";
        }
    }

    return {
        signIn,
        // isUserLoggedIn,
        signUp,
    };
}
