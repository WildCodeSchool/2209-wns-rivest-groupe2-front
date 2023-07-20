import { Point } from 'leaflet';
import { IUser } from './IUserContext';

export interface ICity {
  id: number;
  name: string;
  coordinates: Point;
  users: IUser[];
  pointOfInterest: {
    id: number;
    name: string;
  }[];
}
