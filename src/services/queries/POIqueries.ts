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
      city
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
