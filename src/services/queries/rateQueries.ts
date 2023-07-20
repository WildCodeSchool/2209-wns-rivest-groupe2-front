import { gql } from '@apollo/client';

export const GET_USER_RATE_POI_QUERY = gql`
  query GetUserRateForPOI($userId: Float!, $poiId: Float!) {
    getUserRateForPOI(userId: $userId, poiId: $poiId) {
      id
      rate
      createDate
      updateDate
    }
  }
`;

export const GET_RATES_NUMBER_PER_POI = gql`
  query Query($poiId: Float!) {
    getNumberOfRatesPerPOI(poiId: $poiId)
  }
`;
