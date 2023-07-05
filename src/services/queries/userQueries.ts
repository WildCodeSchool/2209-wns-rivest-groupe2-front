import { gql } from '@apollo/client';

export const GET_USER_QUERY = gql`
  query GetAllUsers {
    getAllUsers {
      id
      email
      username
      firstname
      lastname
      hashedPassword
      profilePicture
      role {
        id
        name
      }
      cities {
        id
        name
      }
    }
  }
`;
