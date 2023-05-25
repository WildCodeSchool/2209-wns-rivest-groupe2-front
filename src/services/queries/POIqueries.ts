import { gql } from '@apollo/client';

export const GET_POI_QUERY = gql`
  query GetAllPoi {
    getAllPoi {
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
    }
  }
`;

export const GET_POI_BY_ID_QUERY = gql`
  query GetPOIbyId($getPoIbyIdId: Float!) {
    getPOIbyId(id: $getPoIbyIdId) {
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
