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
      openingHours {
        id
        dayOpen
        hoursOpen
        hoursClose
      }
      comments {
        id
        createDate
        updateDate
        text
        rate
        user {
          id
          email
          username
        }
      }
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
      openingHours {
        id
        dayOpen
        hoursOpen
        hoursClose
      }
      comments {
        id
        createDate
        updateDate
        text
        rate
        user {
          id
          email
          username
        }
      }
    }
  }
`;
