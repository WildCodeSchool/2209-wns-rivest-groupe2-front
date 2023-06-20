import { gql } from "@apollo/client";

export const GET_USER_FAVORITES = gql`
query GetUserFavorites($userId: Float!) {
    getUserFavorites(userId: $userId) {
      id
      pointOfInterest {
        id
      }
    }
  }
`;
