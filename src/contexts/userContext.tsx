import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { UserType } from 'src/types/UserType';

interface UserContextValue {
  user: UserType;
  //isLoggedIn: boolean;
}

export const UserContext = React.createContext<UserContextValue>({
    user:  {
      id: 9999,
    email: '',
    firstname: '',
    lastname: '',
    profilePicture: ''
    },
   // isLoggedIn: false,
})
const GET_USER_BY_ID = gql` 
query GetUserById($getUserByIdId: Float!) {
  getUserById(id: $getUserByIdId) {
    email
    username
    firstname
    lastname
  }
}
`;

const { data } = useQuery(GET_USER_BY_ID, {
  variables: { getUserByIdId: 1 },
});

interface UserContextProviderProps {
    user: UserType ;
   //setUser(user: React.SetStateAction<UserType | null>): void;
  }
  const [user, setUser] = useState<UserType>({
    id: 9999,
    email: '',
    firstname: '',
    lastname: '',
    profilePicture: ''
  });

  
export const UserContextProvider = ({ children, user }: React.PropsWithChildren<UserContextProviderProps>) => {
  
    useEffect(() => {
        const load = async () => {
            const { data } = useQuery(GET_USER_BY_ID, {
              variables: { getUserByIdId: 1 },
            });
            if (data) {
                setUser({
                    id: data.getUserById.id,
                    email: data.getUserById.email,
                    firstname: data.getUserById.firstname,
                    lastname: data.getUserById.lastname,
                    profilePicture: data.$getUserByIdId.profilePicture
                });
            }
        };
        load();
    }, []);
    return (
        <UserContext.Provider value={{user}}>
            {children}
        </UserContext.Provider>
    );
};