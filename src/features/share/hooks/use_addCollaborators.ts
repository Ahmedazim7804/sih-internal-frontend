
import { useQuery } from "@tanstack/react-query";
import { ICollabrators } from "../interfaces/collabrator_interface";

async function  addCollaborators(spreadsheetId: string, email: string) {
    console.log(email)
    const res = await  fetch(
        `https://sih-internal-backend-pm7h.onrender.com/spreadsheet/collaborators/create?SpreadSheetId=${spreadsheetId}&email=${email}`,
        
        {
            method:"POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI1MDk4MDEyLCJleHAiOjE3MjUxODQ0MTJ9.ZfCHS3knF3zOdgrlx3YL5PEWGfA-VSGt8GWGz2mEmv0`,
                Accept: "/",
            },
        }
    )
    const data =await res.json()
    console.log(data)
    return data
}

export default function useaddCollabrators({
    spreadsheetId,
    email
}: {
    spreadsheetId: string;
    email: string
}) {
    const { isPending, error, data } = useQuery<ICollabrators>({
        queryKey: ["collabrators"],
        queryFn: () =>addCollaborators(spreadsheetId,email),
    });

    return {
        addPending: isPending,
        adderror: error,
        adddata: data,
    };
}
