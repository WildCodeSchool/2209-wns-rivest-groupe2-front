import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignIn/SignIn';
import NotFound from './pages/NotFound/NotFound';
import POIDetails from './pages/POIDetails/POIDetails';
import Dashboard from './layouts/dashboard';
import Auth from './layouts/auth';
import BaseLayout from './layouts/baseLayout';
import POIList from './pages/POIList/POIList';
import RequireAuth from './components/RequireAuth';
import Profile from './pages/Dashboard/Profile';
import ConfirmUserPage from './pages/ConfirmPage';
import EmailSentConfirmationPage from './pages/EmailSentConfirmationPage ';
import Tables from './pages/Dashboard/Tables';
import Cities from './pages/Dashboard/Cities';
import Toaster from './components/Toaster';
import { useContext } from 'react';
import { NotificationContext } from './contexts/NotificationsContext';

const App = () => {
  const { message } = useContext(NotificationContext);

  return (
    <main className="min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<BaseLayout />}>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/confirmation-email-sent"
            element={<EmailSentConfirmationPage />}
          />
          <Route
            path="/confirmation-email/:uuid"
            element={<ConfirmUserPage />}
          />
          <Route
            path="/point-of-interest/list/:cityId/:cityName"
            element={<POIList />}
          />
          <Route
            path="/point-of-interest/:cityId/:cityName/:poiId/:poiName"
            element={<POIDetails />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route
          element={
            <RequireAuth
              allowedRoles={['free_user', 'city_admin', 'super_user', 'admin']}
            />
          }
        >
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route
            element={<RequireAuth allowedRoles={['city_admin', 'admin']} />}
          >
            <Route path="/tables/" element={<Tables />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={['admin']} />}>
            <Route path="/cities/" element={<Cities />} />
          </Route>
        </Route>
      </Routes>
      {message && <Toaster />}
    </main>
  );
};

export default App;
