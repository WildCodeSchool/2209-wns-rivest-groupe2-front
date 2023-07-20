import { gql } from '@apollo/client';

export const USER_ROLE_MUTATION = gql`
  mutation UpdateUserRoleAndCity(
    $role: String!
    $userId: String!
    $cityName: String!
  ) {
    updateUserRoleAndCity(role: $role, userId: $userId, cityName: $cityName) {
      id
      username
      role {
        id
        name
      }
      city {
        id
        name
      }
    }
  }
`;
