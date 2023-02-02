import { useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { UserContext } from 'src/contexts/userContext';
import { IUserContext } from 'src/types/IUserContext';

const RequireAuth = () => {
  //CREATE PRIVATE ROUTE BASED ON THE USER PROFILE
  const { user } = useContext<IUserContext>(UserContext);
  const location = useLocation();

  //OUTLET REPRESENT ANY CHILD OF REQUIREAUTH COMPONENT
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
};

export default RequireAuth;
