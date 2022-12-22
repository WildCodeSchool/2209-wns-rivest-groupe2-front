import React from 'react';
import { NavLink } from 'react-router-dom';
import icon from '../asset/img/vector.png';

const getActiveLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? 'grey' : 'black',
});

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" style={getActiveLinkStyle}>
            <img src={icon} alt="icon site" />
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
