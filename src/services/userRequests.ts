import { UserType } from 'src/types/UserType';
import { gql, useQuery } from '@apollo/client';

export const GET_USER_BY_ID = gql`
  query getUserById {
    getUserById {
        id,
        email,
        firstname,
        lastname,
        profilePicture
    }
  }
`;


export const dataManipulation = (dataFromApi: any) => {
    const newData: UserType[] = dataFromApi.map(
      (user: { email: string;
        firstname: string;
        lastname:string; profilePicture: string}) => {
    
        return { email: user.email,
            firstname: user.firstname,
            lastname:user.lastname,
            profilePicture: user.profilePicture };
      }
    );
    return newData;
  };

  // const { loading, error, data } = useQuery(GET_USER_BY_ID);
 