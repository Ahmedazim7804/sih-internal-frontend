export interface IUser {
    name: string;
    email: string;
    userId: string;
    token: string | null;
}

export interface IUserSheets {
    success: boolean;
    data: Array<IUserSheet>;
}

export interface IUserSheet {
    createdAt: string;
    id: number;
    ownerId: number;
    title: string;
    updatedAt: string;
}

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

export interface ISheetAction {
    type: string;
    payload: any;
}

export type UserType = {
    id: number;

    name: string;
    email: string;
    password: string;
};

export interface ISocketRecieveData {
    isOps: boolean;
    data: any;
}
