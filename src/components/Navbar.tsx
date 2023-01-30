import React from 'react';
import { NavLink } from 'react-router-dom';
import UserDropdown from './UserDropdown';
import logo from '../asset/img/city-guide-logo.svg';

const getActiveLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? 'grey' : 'black',
});

const Navbar = () => {
  return (
    <nav className="border-b-2">
      <ul className="flex justify-between items-center m-5">
        <li>
          <NavLink to="/" style={getActiveLinkStyle}>
            <img src={logo} alt="icon site" />
          </NavLink>
        </li>
        <select
          name="cities"
          id="cities"
          className="bg-white p-[4px] pl-[15px] mt-2 border-2 rounded-xl w-[300px]"
          defaultValue="Paris"
        >
          <option value="City" disabled>
            City
          </option>
          <option value="Paris">Paris</option>
          <option value="Lyon">Lyon</option>
          <option value="Marseille">Marseille</option>
          <option value="Bordeaux">Bordeaux</option>
          <option value="Bordeaux">Bordeaux</option>
          <option value="Toulouse">Toulouse</option>
        </select>
        <div className="flex">
          <li className="pr-5">
            <NavLink to="/signin" style={getActiveLinkStyle}>
              <p>Connexion</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" style={getActiveLinkStyle}>
              <p>Inscription</p>
            </NavLink>
          </li>
          <li>
            <UserDropdown />
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
