import { useQuery } from "@tanstack/react-query";
import { IUserSheets } from "../interfaces/user_sheets_interface";

function getUserSheet() {
    
    return fetch(
        "https://sih-internal-backend-pm7h.onrender.com/spreadsheet/",
        {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI1MDk4MDEyLCJleHAiOjE3MjUxODQ0MTJ9.ZfCHS3knF3zOdgrlx3YL5PEWGfA-VSGt8GWGz2mEmv0`,
                Accept: "/",
            },
        }
    ).then((res) => res.json());
}

export default function useUserSheets() {
    const { isPending, error, data } = useQuery<IUserSheets>({
        queryKey: ["userSheets"],
        queryFn: () => getUserSheet(),
    });

    return {
        isPending,
        error,
        data,
    };
}
