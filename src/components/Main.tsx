import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import SignUp from '../pages/SignUp/SignUp';
import SignIn from '../pages/SignIn/SignIn';
import NotFound from '../pages/NotFound/NotFound';
import Payment from '../pages/Payment/Payment';
import POICreation from '../pages/POICreation/POICreation';
import POIDetails from '../pages/POIDetails/POIDetails';
import Profil from '../pages/Profil/Profil';
import TownsCreation from '../pages/TownsCreation/TownsCreation';

const Main = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/point-of-interest/creation" element={<POICreation />} />
        <Route path="/point-of-interest/:id" element={<POIDetails />} />
        <Route path="/profil/:id" element={<Profil />} />
        <Route path="/towns/creation" element={<TownsCreation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

export default Main;
