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
import RequireAuth from './components/RequireAuth';
import Profile from './pages/dashboard/profile';

const App = () => {
  return (
    <>
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
        <Route element={<RequireAuth allowedRoles={['freeUser']} />}>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
