import { useQuery } from "@tanstack/react-query";
import { ICollabrators } from "../types" 
import { useAuthContext } from "../context/auth_provider";

function getCollabrators({
    spreadsheetId,
    token,
}: {
    spreadsheetId: string;
    token: string | null;
}) {
    if(!token) {
     return  Promise.resolve({data: []})
    }
    return fetch(

        `https://sih-internal-backend-pm7h.onrender.com/spreadsheet/collaborators?SpreadSheetId=${spreadsheetId}`,
        {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Bearer ${token}`,
                Accept: "/",
            },
        }
    ).then((res) => res.json());
}

export default function useCollabrators({
    spreadsheetId,
    token
}: {
    spreadsheetId: string;
    token: string | null;
}) {

    const { isPending, error, data } = useQuery<ICollabrators>({
        queryKey: ["collabrators"],
        queryFn: () => getCollabrators({ spreadsheetId, token }),
    });

    return {
        isPending,
        error,
        data,
    };
}
