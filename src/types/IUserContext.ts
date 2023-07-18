export interface IUser {
  id: number;
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
  role: string;
  city: string
}

export interface IUserContext {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}
