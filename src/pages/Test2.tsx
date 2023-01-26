import React from 'react'
import { gql, useQuery } from '@apollo/client';

type Properties = {
  chat: string
}

const Test2 = ({chat}: Properties) => {


  const GET_USER_BY_ID = gql`
  query getUserById {
    getUserById {
        id,
        email,
        firstname,
        lastname,
    }
  }
`;

useQuery(GET_USER_BY_ID)

  return (
      <>
    <div>
    Ici ton composant num: 2 avec les props précédentes
    <div>{chat}</div>
    <div>{chat}</div>
    <div>{chat}</div>
    <div>{chat}</div>
    <div>{chat}</div>
    </div>
    </>
  )
}

export default Test2