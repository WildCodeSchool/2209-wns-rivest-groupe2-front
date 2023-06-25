import { Point } from 'leaflet';
import { LatLngExpression } from 'leaflet';

export interface IPOICard {
  id: number;
  name: string;
  address: string;
  postal: string;
  city: string;
  pictureUrl: string[];
  description: string;
  type: string;
  averageRate?: number;
  setOpenModalAddPlace?: any;
  openModalAddPlace?: boolean;
  websiteURL?: string;
  daysOpen?: string[];
  hoursOpen?: string[];
  hoursClose?: string[];
}

enum POIType {
  RESTAURANT = 'restaurant',
  FASTFOOD = 'fast-food',
  BAR = 'bar',
  PLACEOFRELIGION = 'lieu de culte',
  HOSTEL = 'hôtel',
  MUSEUM = 'musée',
}

enum EPriceRange {
  LOW = '$',
  MEDIUM = '$$',
  HIGH = '$$$',
}

export type IFormInput = {
  name: string;
  address: string;
  postal: string;
  type: POIType;
  coordinates: Point;
  creationDate: Date;
  pictureUrl: string[];
  websiteURL: string;
  description: string;
  priceRange: EPriceRange;
  city: string;
  daysOpen: string;
  firstHoursOpen: string;
  firstHoursClose: string;
  secondHoursOpen: string;
  secondHoursClose: string;
};

export type POICommentType = {
  id: number;
  createDate: string;
  updateDate: string | null;
  text: string;
  rate: number;
  user: {
    id: number;
    email: string;
    username: string | null;
  };
};
export interface IPOIData {
  id: number;
  name: string;
  address: string;
  postal: string;
  type: string;
  coordinates: LatLngExpression;
  pictureUrl: string[];
  websiteURL: string;
  description: string;
  creationDate: string;
  priceRange: string;
  city: string;
  daysOpen: string[];
  hoursOpen: string[];
  hoursClose: string[];
  averageRate?: number;
  comments: POICommentType[] | [];
}

export interface IFavorite {
  id: number;
  user: {
    id: number;
  };
  pointOfInterest: {
    id: number;
  };
}

export type ImagesProps = {
  image: Blob;
  imageUrl: string | null;
  preview: string;
  id: number;
};
