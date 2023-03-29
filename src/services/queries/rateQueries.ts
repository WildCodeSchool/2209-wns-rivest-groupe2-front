import { gql } from "@apollo/client";

export const GET_USER_RATE_POI_QUERY = gql`
query GetUserRateForPOI($userId: Float!, $poiId: Float!) {
    getUserRateForPOI(userId: $userId, poiId: $poiId) {
      id
      rate
      createDate
      updateDate
    }
  }
  `