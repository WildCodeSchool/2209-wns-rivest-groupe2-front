import React, { useEffect, useState } from 'react'
import { UserType } from 'src/types/UserType';

type UserPromise = Promise<{ success: boolean; errorCode: number }>

interface UserContextValue {
  user: UserType | null;
  isLoggedIn: boolean;
  login(username: string, password: string, remember: boolean): UserPromise;
}
export const UserContext = React.createContext<UserContextValue>({
    user: null,
    isLoggedIn: false,
    login: async () => ({ success: false, errorCode: 0 })
})

interface UserContextProviderProps {
    user: UserType | null;
    setUser(user: React.SetStateAction<UserType | null>): void;
  }

  export const UserContextProvider = ({ children }: React.PropsWithChildren<UserContextProviderProps>) => {
   const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setUser(await getUser());
      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}