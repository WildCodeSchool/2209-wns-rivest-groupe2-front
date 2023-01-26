import React from 'react'
import { gql, useQuery } from '@apollo/client';
import { UserType } from 'src/types/UserType';
import Test2 from './Test2';

type Properties = {
  chat: string
  chien: string
}

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

const Test = ({chat, chien}: Properties) => {

const dataManipulation = (dataFromApi: any) => {
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

const {data} =useQuery(GET_USER_BY_ID)
console.log(data);


  return (
      <>
    <div>test</div>
    <div>test</div>
    <div>test</div>
    <div>test</div>
    <Test2 chat={chat}/>
    <div>Ici il y a le chat: {chat}</div>
    <div>Ici il y a le chien: {chien}</div>
{/*     {dataManipulation(data.getUserById).map((el)=> (el.email))} */}
    </>
  )
}

export default Test