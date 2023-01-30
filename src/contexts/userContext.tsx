import { gql, useQuery } from '@apollo/client';
import React, { useMemo } from 'react'
import { UserType } from 'src/types/UserType';

interface UserContextValue {
  user: UserType | null;
  setUser: (value: React.SetStateAction<UserType | null>) => void;
}

export const UserContext = React.createContext<UserContextValue>({
    user:  null,
    setUser: () => {},
})

interface UserContextProviderProps {
    user: UserType | null ;
   setUser(user: React.SetStateAction<UserType | null>): void;
  }

export const UserContextProvider = ({ user, setUser, children }: React.PropsWithChildren<UserContextProviderProps>) => {

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