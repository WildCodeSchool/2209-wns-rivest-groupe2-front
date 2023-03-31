import { gql } from '@apollo/client';

export const CREATE_POI_MUTATION = gql`
  mutation CreatePoi($data: CreatePoiInput!) {
    createPoi(data: $data) {
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

export const DELETE_POI_MUTATION = gql`
  mutation DeletePoi($deletePoiId: Float!) {
    deletePoi(id: $deletePoiId)
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
