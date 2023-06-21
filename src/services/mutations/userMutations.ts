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
mutation Mutation($email: String!, $password: String!) {
  createUser(email: $email, password: $password) {
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