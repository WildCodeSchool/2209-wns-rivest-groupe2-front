import React from 'react';
import { NavLink } from 'react-router-dom';
import icon from '../asset/img/vector.png';

const getActiveLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? 'grey' : 'black',
});

const Navbar = () => {
  return (
    <nav>
      <ul className="flex justify-between items-center m-5">
        <li>
          <NavLink to="/" style={getActiveLinkStyle}>
            <img src={icon} alt="icon site" />
          </NavLink>
        </li>
        <select
          name="cities"
          id="cities"
          className="bg-white p-[4px] pl-[15px] mt-2 border border-2 rounded-xl w-[300px]"
        >
          <option value="City" disabled>
            City
          </option>
          <option value="Paris" selected>
            Paris
          </option>
          <option value="Lyon">Lyon</option>
          <option value="Marseille">Marseille</option>
          <option value="Bordeaux">Bordeaux</option>
          <option value="Bordeaux">Bordeaux</option>
          <option value="Toulouse">Toulouse</option>
        </select>
        <div className="flex">
          <li className="pr-5">
            <NavLink to="/signin" style={getActiveLinkStyle}>
              <p>Sign In</p>
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" style={getActiveLinkStyle}>
              <p>Sign Up</p>
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
