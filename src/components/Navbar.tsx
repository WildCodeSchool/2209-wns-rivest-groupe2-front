import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const getActiveLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? 'grey' : 'black',
});

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" style={getActiveLinkStyle}>
            <p>Home</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/signin" style={getActiveLinkStyle}>
            <p>SignIn</p>
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" style={getActiveLinkStyle}>
            <p>SignUp</p>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
