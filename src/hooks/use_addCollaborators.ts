import { useQuery } from "@tanstack/react-query";
import { ICollabrators } from "../types" 
import { useAuthContext } from "../context/auth_provider";

async function addCollaborators({
    spreadsheetId,
    token,
    email,
}: {
    spreadsheetId: string;
    token: string;
    email: string;
}) {
    const res = await fetch(
        `https://sih-internal-backend-pm7h.onrender.com/spreadsheet/collaborators/create?SpreadSheetId=${spreadsheetId}&email=${email}`,

        {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Bearer ${token}`,
                Accept: "/",
            },
        }
    );
    const data = await res.json();
    return data;
}

export default function useAddCollabrators({
    spreadsheetId,
}: {
    spreadsheetId: string;
}) {
    const { user } = useAuthContext();

    const { isPending, error, data } = useQuery<ICollabrators>({
        queryKey: ["collabrators"],
        queryFn: () =>
            addCollaborators({
                spreadsheetId: spreadsheetId,
                email: user!.email,
                token: user!.token!,
            }),
    });

    return {
        addPending: isPending,
        adderror: error,
        adddata: data,
    };
}
