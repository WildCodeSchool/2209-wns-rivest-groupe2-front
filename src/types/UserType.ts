export interface IUser {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  username: string;
  profilePicture?: string;
  role: Role;
}

interface Role {
  id: string;
  name: string;
  description: string;
}
