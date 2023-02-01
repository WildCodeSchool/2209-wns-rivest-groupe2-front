
import { createContext, useState } from 'react'
import { IUser } from '../interfaces/IUser'
import { IUserContext } from '../interfaces/IUserContext'

// CREATE USER CONTEXT
export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
})

// GET USER INFO FROM LOCAL STORAGE AND PARSE IT
const localUser = localStorage.getItem('user')
const parseUser: IUser | undefined = localUser ? JSON.parse(localUser) : null

export const UserProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<IUser | null>(parseUser || null)

  return (
    <UserContext.Provider
      value={{ user, setUser }}
    >
      {children}
    </UserContext.Provider>
  )
}