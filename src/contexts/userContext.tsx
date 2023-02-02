
import { createContext, useState, useMemo } from 'react'
import { IUserContext, IUser } from '../types/IUserContext'

// CREATE USER CONTEXT
export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
})

// GET USER INFO FROM LOCAL STORAGE AND PARSE IT
const localUser = localStorage.getItem('user')
const parseUser: IUser | undefined = localUser ? JSON.parse(localUser) : null

export const UserContextProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IUser | null>(parseUser || null)
 
  const value = useMemo(
    ()=>({
      user,
      setUser,
    }),
    [user, setUser]
  )

  return (
    <UserContext.Provider
      value={value}
    >
      {children}
    </UserContext.Provider>
  )
}