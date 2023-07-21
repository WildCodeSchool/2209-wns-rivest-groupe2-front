import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import image from '../../asset/img/map.png';
import logo from '../../asset/img/city-guide-logo.svg';
import { useQuery } from '@apollo/client';
import { GET_ALL_CITIES } from 'src/services/queries/cityQueries';
import { ICityData } from 'src/types/CityType';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [open, setOpen] = useState(false);
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

  useEffect(() => {
    const lastShown = localStorage.getItem('lastShown');
    const dateNow = new Date();
    const dateDay = dateNow.setHours(0, 0, 0, 0); // set the time to 00:00:00

    if (!lastShown || Number(lastShown) < dateDay) {
      setOpen(true);
      localStorage.setItem('lastShown', dateDay.toString());
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="relative">
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <div className="flex justify-center mb-4">
            <img className="mx-auto" src={logo} alt="icon site" />
          </div>
          <DialogContentText>
            Bonjour et bienvenue sur City Guide, Cherchez un lieu qui vous plaît
            à visiter et cliquez dessus pour en savoir plus sur celui-ci ! Bonne
            visite !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
        </DialogActions>
      </Dialog>

      <div
        className="w-full bg-cover bg-no-repeat bg-center opacity-25 h-screen overscroll-none relative"
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="flex flex-col w-[400px] h-[200px] justify-center items-center bg-white p-4 rounded-lg shadow-2xl absolute mx-auto top-0 bottom-0 my-auto left-0 right-0 z-2">
        <div className="mb-4">
          <img src={logo} alt="icon site" />
        </div>
        <div className="decoration-solid pb-2">Choissez votre ville</div>
        {getCitiesError ? (
          <div>Erreur lors de la récupération des villes :(</div>
        ) : getCitiesLoading ? (
          <div>Chargement...</div>
        ) : cities.length > 0 ? (
          <select
            name="cities"
            id="cities"
            defaultValue="Ville"
            onChange={(e) =>
              navigate(`/point-of-interest/list/${e.target.value}`)
            }
            className="w-full content-center p-2.5 text-gray-500 bg-transparent border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
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
      </div>
    </div>
  );
};

export default Home;
