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
