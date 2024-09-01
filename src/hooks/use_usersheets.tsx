import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../context/auth_provider";
import { IUserSheets } from "../types";

function getUserSheet(token: string | null) {
    if(!token){
        return Error("Token not found")
    }
    return fetch(
        "https://sih-internal-backend-pm7h.onrender.com/spreadsheet/",
        {
            headers: {
                "Content-Type": "application/json;",
                Authorization: `Bearer ${token}`,
                Accept: "/",
            },
        }
    ).then((res) => res.json());
}

export default function useUserSheets() {
    const { user } = useAuthContext();

    if (user == null) {
        console.log("NXJXUSXHSJX");
    }

    const { isPending, error, data } = useQuery<IUserSheets>({
        queryKey: ["userSheets"],
        queryFn: async () => {
            try {
                const result = await getUserSheet(localStorage.getItem("token"));
                return result;
            } catch (error) {
                throw new Error("Failed to fetch user sheets");
            }
        },
    });

    return {
        isPending,
        error,
        data,
    };
}
