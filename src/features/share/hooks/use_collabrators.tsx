import { useQuery } from "@tanstack/react-query";
import { ICollabrators } from "../interfaces/collabrator_interface";

function getCollabrators(spreadsheetId: string) {
    return fetch(
        `https://sih-internal-backend-pm7h.onrender.com/spreadsheet/collaborators?SpreadSheetId=${spreadsheetId}`,
        {
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI1MDk4MDEyLCJleHAiOjE3MjUxODQ0MTJ9.ZfCHS3knF3zOdgrlx3YL5PEWGfA-VSGt8GWGz2mEmv0`,
                Accept: "/",
            },
        }
    ).then((res) => res.json());
}

export default function useCollabrators({
    spreadsheetId,
}: {
    spreadsheetId: string;
}) {
    const { isPending, error, data } = useQuery<ICollabrators>({
        queryKey: ["collabrators"],
        queryFn: () => getCollabrators(spreadsheetId),
    });

    return {
        isPending,
        error,
        data,
    };
}
