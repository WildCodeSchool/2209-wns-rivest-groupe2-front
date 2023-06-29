import { IUser } from "./IUserContext";

export interface ICity {
    id: number;
    name: string;
    description: string;
    population: number;
    user : IUser;
  }
  