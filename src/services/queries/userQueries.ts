import { gql } from '@apollo/client';

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

export const GET_TOKEN = gql`
  query Query($password: String!, $email: String!) {
    getToken(password: $password, email: $email) {
      token
      userFromDB {
        id
        email
        username
        firstname
        lastname
        profilePicture
        type
        isVerified
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query GetUserById($getUserByIdId: Float!) {
    getUserById(id: $getUserByIdId) {
      id
      email
      username
      type
      firstname
      lastname
    }
  }
`;
