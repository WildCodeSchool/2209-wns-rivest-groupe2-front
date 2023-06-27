export interface IUser {
  id: number;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
  role: string;
}

export interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}
