import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import icon from '../asset/img/logo.png';
import UserDropdown from './UserDropdown';
import logo from '../asset/img/city-guide-logo.svg';
import { UserContext } from '../contexts/userContext';

const getActiveLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? 'grey' : 'black',
});

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  return (
    <nav className="border-b-2">
      <ul className="flex flex-grow justify-between items-center m-5">
        <li>
          <NavLink to="/" style={getActiveLinkStyle}>
            <img src={icon} alt="icon site" className="h-20" />
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
        <div className="items-center">
          {user ? (
            <li className="w-12 h-12">
              <UserDropdown />
            </li>
          ) : (
            <div className="flex items-center gap-2">
            <li>
              <NavLink to="/signin" style={getActiveLinkStyle}>
                <button className="bg-gradient-to-r from-opalblue to-opalblue hover:from-opalblue hover:to-blue-500 rounded-full py-2 px-6 w-full text-white text-[1rem] text-center font-semibold">
                  Connexion
                </button>
              </NavLink>
            </li>
            <li>
            <NavLink to="/signup" style={getActiveLinkStyle}>
              <button className="bg-gradient-to-r from-opalblue to-opalblue hover:from-opalblue hover:to-blue-500 rounded-full py-2 px-6 w-full text-white text-[1rem] text-center font-semibold">
                Inscription
              </button>
            </NavLink>
          </li>
          </div>
          )}
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
