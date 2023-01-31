import { IUser } from './IUser'

export interface IUserContext {
    user: IUser | null
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}