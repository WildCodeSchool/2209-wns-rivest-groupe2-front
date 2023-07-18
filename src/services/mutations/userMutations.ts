import { gql } from '@apollo/client';

export const CONFIRM_USER_MUTATION = gql`
  mutation ConfirmUser($uuid: String!) {
    confirmUser(uuid: $uuid) {
      id
      email
      username
      type
      firstname
      lastname
      uuid
      isVerified
      profilePicture
    }
  }
`;

export const CREATE_USER = gql`
  mutation Mutation($email: String!, $username: String!, $password: String!) {
    createUser(email: $email, username: $username, password: $password) {
      token
      userFromDB {
        id
        email
        username
        firstname
        lastname
        profilePicture
        type
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: Float!) {
    deleteUser(id: $deleteUserId)
  }
`;
