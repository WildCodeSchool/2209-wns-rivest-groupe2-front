import { gql } from '@apollo/client';

export const CREATE_POI_MUTATION = gql`
  mutation CreatePoi($data: CreatePoiInput!) {
    createPoi(data: $data) {
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
      city
      openingHours {
        value
        name
        hoursOpen
        hoursClose
      }
    }
  }
`;

export const UPDATE_POI_MUTATION = gql`
  mutation UpdatePoi($data: UpdatePoiInput!) {
    updatePoi(data: $data) {
      id
      name
      address
      postal
      type
      coordinates
      pictureUrl
      websiteURL
      description
      city
      openingHours {
        value
        name
        hoursOpen
        hoursClose
      }
    }
  }
`;

export const DELETE_POI_MUTATION = gql`
  mutation DeletePoi($deletePoiId: Float!) {
    deletePoi(id: $deletePoiId)
  }
`;
