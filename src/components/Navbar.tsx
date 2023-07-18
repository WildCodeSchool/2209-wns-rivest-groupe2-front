import { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import icon from '../asset/img/logo.png';
import UserDropdown from './UserDropdown';
import logo from '../asset/img/city-guide-logo.svg';
import { UserContext } from '../contexts/userContext';
import { ICityData } from 'src/types/CityType';
import { useQuery } from '@apollo/client';
import { GET_ALL_CITIES } from 'src/services/queries/cityQueries';

const getActiveLinkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? 'grey' : 'black',
});

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [cities, setCities] = useState<ICityData[]>([]);
  const navigate = useNavigate();

  const {
    loading: getCitiesLoading,
    error: getCitiesError,
    data: getCitiesData,
  } = useQuery(GET_ALL_CITIES);

  useEffect(() => {
    if (getCitiesData?.getAllCities) setCities(getCitiesData.getAllCities);
  }, [getCitiesData]);

  return (
    <nav className="border-b-2">
      <ul className="flex flex-grow justify-between items-center m-5">
        <div className="flex items-center">
          <NavLink to="/" style={getActiveLinkStyle}>
            <img src={icon} alt="icon site1" className="h-20" />
          </NavLink>
          <NavLink to="/" style={getActiveLinkStyle} className="pl-2">
            <img src={logo} alt="icon site2" />
          </NavLink>
        </div>
        {getCitiesError ? (
          <div>Erreur lors de la récupération des villes :(</div>
        ) : getCitiesLoading ? (
          <div>Chargement...</div>
        ) : cities.length > 0 ? (
          <select
            name="cities"
            id="cities"
            defaultValue="Ville"
            className="bg-white p-[4px] pl-[15px] mt-2 border-2 rounded-xl w-[300px]"
            onChange={(e) =>
              navigate(`/point-of-interest/list/${e.target.value}`)
            }
          >
            <option value="Ville" disabled>
              Ville
            </option>
            {cities.map((city) => (
              <option key={city.id} value={`${city.id}/${city.name}`}>
                {city.name}
              </option>
            ))}
          </select>
        ) : (
          <div>Aucune ville renseignée actuellement</div>
        )}
        {user ? (
          <li>
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
      </ul>
    </nav>
  );
};

export default Navbar;
