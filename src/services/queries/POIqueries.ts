import { gql } from '@apollo/client';

export const GET_POI_QUERY = gql`
  query GetAllPois {
    getAllPoi {
      id
      name
      address
      postal
      type
      coordinates
      creationDate
      pictureUrl
      websiteURL
      description
      priceRange
      city
      daysOpen
      hoursOpen
      hoursClose
    }
  }
`;

export const GET_POI_BY_ID_QUERY = gql`
  query GetPOIbyId($getPoIbyId: Float!) {
    getPoIbyId(id: $getPoIbyId) {
      id
      name
      address
      postal
      type
      coordinates
      creationDate
      averageRate
      pictureUrl
      websiteURL
      description
      priceRange
      city
      daysOpen
      hoursOpen
      hoursClose
      getRates {
        id
        rate
        createDate
        updateDate
      }
    }
  }
`;
