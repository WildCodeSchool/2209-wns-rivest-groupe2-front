import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import image from '../../asset/img/map.png';
import logo from '../../asset/img/city-guide-logo.svg';

const Home = () => {
  const [open, setOpen] = useState(false);

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
        <select
          id="select a city"
          onChange={() => (document.location = '/point-of-interest/list')}
          className="w-full content-center p-2.5 text-gray-500 bg-transparent border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
        >
          <option value="ville">Ville</option>
          <option value="Paris">Paris</option>
          <option value="Lyon">Lyon</option>
          <option value="Marseille">Marseille</option>
          <option value="Bordeaux">Bordeaux</option>
          <option value="Bordeaux">Bordeaux</option>
          <option value="Toulouse">Toulouse</option>
        </select>
      </div>
    </div>
  );
};

export default Home;
