import { gql } from '@apollo/client';

export const USER_ROLE_MUTATION = gql`
  mutation UpdateUserRole($role: String!, $userId: String!) {
    updateUserRole(role: $role, userId: $userId) {
      id
      role {
        name
      }
    }
  }
`;
