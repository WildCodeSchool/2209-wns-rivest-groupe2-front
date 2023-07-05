import { ICity } from "./ICity";
import { IRole } from "./IRole";

export interface IUser {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  username: string;
  profilePicture?: string;
  role: IRole;
  cities: ICity[];
}
