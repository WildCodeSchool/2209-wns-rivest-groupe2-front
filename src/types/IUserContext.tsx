export interface IUser {
    id: number;
    email: string;
    username: string;
    type: string;
    firstname: string;
    lastname: string;
    profilePicture: string;
}

export interface IUserContext {
    user: IUser | null
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}