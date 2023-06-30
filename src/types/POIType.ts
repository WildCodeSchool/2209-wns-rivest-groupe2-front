import { Point } from 'leaflet';
import { LatLngExpression } from 'leaflet';

export type OpeningHoursData = {
  id: number;
  value: string;
  name: string;
  hoursOpen: string[] | [];
  hoursClose: string[] | [];
};

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
  openingHours?: OpeningHoursData[];
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
  openingHours: OpeningHoursData[];
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
  openingHours: OpeningHoursData[];
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

export type DaysOpenProps = {
  id: number;
  value: string;
  name: string;
  isOpen: boolean;
  selected: boolean;
  hoursOpen: string[];
  hoursClose: string[];
};
