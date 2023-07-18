import { gql } from '@apollo/client';

export const GET_POI_QUERY = gql`
  query GetAllPoiInCity($cityId: Float!) {
    getAllPoiInCity(cityId: $cityId) {
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
      city {
        id
        name
      }
      openingHours {
        id
        value
        name
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
