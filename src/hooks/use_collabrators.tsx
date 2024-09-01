import { useQuery } from "@tanstack/react-query";
import { ICollabrators } from "../types" 
import { useAuthContext } from "../context/auth_provider";

function getCollabrators({
    spreadsheetId,
    token,
}: {
    spreadsheetId: string;
    token: string;
}) {
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
    token: string
}) {
    const { user } = useAuthContext();

    const { isPending, error, data } = useQuery<ICollabrators>({
        queryKey: ["collabrators"],
        queryFn: () => getCollabrators({ spreadsheetId, token: user!.token! }),
    });

    return {
        isPending,
        error,
        data,
    };
}
