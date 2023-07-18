import { gql } from "@apollo/client";

export const RATE_POI_MUTATION = gql`
 mutation Mutation($rate: Float!, $userId: Float!, $poiId: Float!) {
  ratePOI(rate: $rate, userId: $userId, poiId: $poiId) {
    id
    rate
    createDate
    updateDate
  }
}
`;