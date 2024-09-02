import { useQuery } from "@tanstack/react-query";
import { IUserSheets } from "../types";

function getUserSheet(token: string | null) {
    if (token === null) {
        return Error("Token not found");
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

export default function useUserSheets(token: any) {
    const tokenNull: boolean = token === undefined || token === null;

    console.log(tokenNull);

    console.log(token);

    const { isPending, error, data } = useQuery<IUserSheets>({
        queryKey: ["userSheets"],
        queryFn: async () => {
            try {
                const result = await getUserSheet(
                    tokenNull ? localStorage.getItem("token") : token
                );
                return result;
            } catch {
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
