import { useQuery } from "@tanstack/react-query";
import { IUserSheets } from "../../../types" 
import { useAuthContext } from "../../../context/auth_provider";

function getUserSheet(token: string) {
    console.log(token);
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
        queryFn: () =>
            getUserSheet(
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImlhdCI6MTcyNTE4OTc5NSwiZXhwIjoxNzI1Mjc2MTk1fQ.f9alkmN5hUzHRpRUfHTwXJjH0d5b0TPjlu4_Hao9u8g"
            ),
    });

    return {
        isPending,
        error,
        data,
    };
}
