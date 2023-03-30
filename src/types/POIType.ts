import { Point } from 'leaflet';
import { LatLngExpression } from 'leaflet';

export interface IPOICard {
  name: string;
  address: string;
  postal: string;
  city: string;
  pictureUrl: string;
  description: string;
  type: string;
  rate?: number;
  id: number;
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
  pictureUrl: string;
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

export type IDataFromApi = {
  latitude: number;
  longitude: number;
  type: string;
  name: string;
  number: string;
  postal_code: string;
  street: string;
  confidence: number;
  region: string;
  region_code: string;
  county: null;
  locality: string;
  administrative_area: string;
  neighbourhood: string;
  country: string;
  country_code: string;
  continent: string;
  label: string;
};

export interface IPOIData {
  id: number;
  name: string;
  address: string;
  postal: string;
  type: string;
  coordinates: LatLngExpression;
  pictureUrl: string;
  websiteURL: string;
  description: string;
  creationDate: string;
  priceRange: string;
  city: string;
  daysOpen: string[];
  hoursOpen: string[];
  hoursClose: string[];
}
