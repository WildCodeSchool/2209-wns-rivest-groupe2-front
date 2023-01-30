
import { createContext, useState } from 'react'

interface IUser {
  email: string;
  username: string;
  type: string;
  firstname: string;
  lastname: string;
  profilePicture: string;
}

interface IUserContext {
  user: IUser | null
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>
}

export const UserContext = createContext<IUserContext>({
  user: null,
  setUser: () => {},
})

const stringUser = localStorage.getItem('user')
const parseUser: IUser | undefined = stringUser && JSON.parse(stringUser)

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





// import React from 'react';
// import { gql, useQuery } from '@apollo/client';
// import { useState, useMemo, createContext, useContext, useEffect } from 'react';
// import jwt_decode from 'jwt-decode';

// interface IUser {
//   email: string;
//   username: string;
//   type: string;
//   firstname: string;
//   lastname: string;
//   profilePicture: string;
// }

// interface IUserContext {
//   user: IUser | null;
//   setUser: (newValue: IUser | null) => void;
// }

// export const UserContext = React.createContext<IUserContext>({
//   user: null,
//   setUser: () => {},
// });

// const UserContextProvider = ({ children }: any) => {
//   const GET_USER_BY_ID = gql`
//     query GetUserById($getUserByIdId: Float!) {
//       getUserById(id: $getUserByIdId) {
//         email
//         username
//         type
//         firstname
//         lastname
//         profilePicture
//       }
//     }
//   `;

//   const [user, setUser] = useState<IUser | null>(null);


//   console.log('=======> user', user);

//   const { data } = useQuery(GET_USER_BY_ID, {
//     variables: { getUserByIdId: 1 },
//   });

//   const value = useMemo(
//     () => ({
//       user,
//       setUser,
//     }),
//     [user, setUser]
//   );

//   return (
//     <div>
//       <UserContext.Provider value={value}>
//         {children}
//       </UserContext.Provider>
//     </div>
//   );
// };

// export default UserContextProvider;
