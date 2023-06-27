import { useContext } from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { UserContext } from 'src/contexts/userContext';
import { IUserContext } from 'src/types/IUserContext';

interface IAllowedRoles {
  allowedRoles: String[]
}

const RequireAuth = ({ allowedRoles }:IAllowedRoles) => {
  //CREATE PRIVATE ROUTE BASED ON THE USER PROFILE
  const { user } = useContext<IUserContext>(UserContext);
  const location = useLocation();

  //SPLIT ROLES TO CHECK WITH ALLOWEDROLES FROM APP
  let roles: any = user?.role.split(" ");
  
  //OUTLET REPRESENT ANY CHILD OF REQUIREAUTH COMPONENT
  return roles.find((role: any)=> allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
};

export default RequireAuth;
