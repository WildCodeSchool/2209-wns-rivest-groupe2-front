import { IUser } from "./IUserContext";
import { IPOIData } from "./POIType";

export interface IFavorite {
    id: number;
    user: IUser;
    pointOfInterest: IPOIData
    poiId: number
  }