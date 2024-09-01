export interface ICollabrators {
    success: boolean;
    data: Array<ICollabrator>;
}

export interface ICollabrator {
    id: number;
    spreadsheetId: number;
    userId: number;
    editPermissions: boolean;
    createdAt: string;
    user: {
        email: string;
        name: string;
        id: number;
    };
}
