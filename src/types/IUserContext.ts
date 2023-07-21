export interface IUser {
  id: number;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
  city: string;
  role: IRole;
}

export interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export interface IRole {
  id: number;
  name: string;
}