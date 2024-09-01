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
