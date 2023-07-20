import { gql } from '@apollo/client';

export const GET_ROLES_CITIES_QUERY = gql`
  query GetAllCitiesAndRoles {
    getAllCities {
      id
      name
      users {
        id
      }
    }
    getAllRoles {
      id
      name
      description
    }
  }
`;
