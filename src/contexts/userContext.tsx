import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useMemo, useState } from 'react'
import { UserType } from 'src/types/UserType';

interface UserContextValue {
  user: UserType | null;
  setUser: (value: React.SetStateAction<UserType | null>) => void;
}

export const UserContext = React.createContext<UserContextValue>({
    user:  null,
    setUser: () => {},
})


export const UserContextProvider = ( { children }: React.PropsWithChildren) => {
  const [user, setUser] = useState<UserType | null>({
    id: 1,
    email: '',
    firstname: '',
    lastname: '',
    username: '',
    profilePicture: ''
  });

  const GET_USER_BY_ID = gql` 
  query GetUserById($getUserByIdId: Float!) {
  getUserById(id: $getUserByIdId) {
    id
    email
    username
    firstname
    lastname
    profilePicture
  }
}
`;

const { data } = useQuery(GET_USER_BY_ID, {
  variables: { getUserByIdId: 1 },
});

  useEffect(()=>{
    if (data){
    setUser({
      id: data.getUserById.id,
      email: data.getUserById.email,
      firstname: data.getUserById.firstname,
      lastname: data.getUserById.lastname,
      username: data.getUserById.username,
      description: data.getUserById.description,
      profilePicture: ''
    })
  }
  }, [data])
  
    const value = useMemo(
      ()=>({
        user,
        setUser,
      }),
      [user, setUser]
    )
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};