import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import NotFound from './pages/NotFound/NotFound';
import Payment from './pages/Payment/Payment';
import POICreation from './pages/POICreation/POICreation';
import POIDetails from './pages/POIDetails/POIDetails';
import Profil from './pages/Profil/Profil';
import TownCreation from './pages/TownCreation/TownCreation';
import Dashboard from './layouts/dashboard';
import Auth from './layouts/auth';
import BaseLayout from './layouts/baseLayout';
import DashboardHome from './pages/dashboard/home';
import POIList from './pages/POIList/POIList';
import { UserContextProvider } from './contexts/userContext';
import { useState, useEffect } from 'react';
import { UserType } from './types/UserType';
import { gql, useQuery } from '@apollo/client';

const App = () =>{
  const [user, setUser] = useState<UserType | null>({
    email: '',
    firstname: '',
    lastname: 'eazeazzae+9+',
    username: 'un username',
    profilePicture: ''
  });

  const GET_USER_BY_ID = gql` 
  query GetUserById($getUserByIdId: Float!) {
  getUserById(id: $getUserByIdId) {
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
      email: data.getUserById.email,
      firstname: data.getUserById.firstname,
      lastname: data.getUserById.lastname,
      username: data.getUserById.firstname + ' ' + data.getUserById.lastname.charAt(0) + '.',
      description: data.getUserById.description,
      profilePicture: ''
    })
  }
  }, [data])

/* 
 */
  return (
  <>
   <UserContextProvider user={user} setUser={setUser}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<BaseLayout />}>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/point-of-interest/list" element={<POIList />} />
        <Route path="/point-of-interest/creation" element={<POICreation />} />
        <Route path="/point-of-interest/:id/:name" element={<POIDetails />} />
        <Route path="/profil/:id" element={<Profil />} />
        <Route path="/town/creation" element={<TownCreation />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/" element={<DashboardHome />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  </UserContextProvider>
  </>
);
  }

export default App;
