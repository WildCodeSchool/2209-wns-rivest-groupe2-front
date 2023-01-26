import { useState } from 'react';
import MapModule from '../../components/MapModule';
import { poiData } from 'src/data/poi-data';
import POICard from 'src/components/POICard';
import { Link } from 'react-router-dom';
import ModalAddPlace from 'src/components/ModalAddPlace/ModalAddPlace';

const POIList = () => {
  const [openModalAddPlace, setOpenModalAddPlace] = useState(false);
  const city = poiData[0].address
    .split(' ')
    .slice(-2, -1)
    .join(' ')
    .split(',')[0];
  const count = poiData.length;

  return (
    <div className="mt-5">
      <div className="flex justify-between mx-5">
        <strong className="py-[5px] pl-[80px]" id="results-number">
          {count} résultat{count > 1 ? 's' : ''} de{' '}
          {poiData[0].type.toUpperCase()} à {city.toUpperCase()}
        </strong>
        <button
          className="px-[15px] py-[4px] mt-2 border-2 rounded-xl"
          onClick={() => setOpenModalAddPlace(!openModalAddPlace)}
        >
          {!openModalAddPlace ? 'Ajouter votre lieu' : "Annuler l'ajout"}
        </button>
        <select
          name="cities"
          id="cities"
          className="bg-white px-[15px] py-[4px] mt-2 border-2 rounded-xl"
        >
          <option value="City">Ville</option>
          <option value="Paris">Paris</option>
          <option value="Lyon">Lyon</option>
          <option value="Marseille">Marseille</option>
          <option value="Bordeaux">Bordeaux</option>
          <option value="Bordeaux">Bordeaux</option>
          <option value="Toulouse">Toulouse</option>
        </select>
        <select
          name="categories"
          id="categories"
          className="bg-white px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl"
        >
          <option value="Category">Catégorie</option>
          <option value="restaurant">Restaurant</option>
          <option value="fast-food">Fast-Food</option>
          <option value="bar">Bar</option>
          <option value="surch">Eglise</option>
          <option value="hotel">Hotel</option>
          <option value="museum">Musée</option>
        </select>
      </div>
      <div className="flex pt-5">
        <div className="h-full overflow-auto w-[100%]">
          {openModalAddPlace ? (
            <ModalAddPlace />
          ) : (
            <ul
              id="poi-list"
              className="flex justify-around py-4 flex-wrap w-4/5 my-3.5 mx-auto"
            >
              {poiData.map((poi) => (
                <Link
                  key={poi.id}
                  to={`/point-of-interest/${poi.id}/${poi.name}`}
                  style={{ cursor: 'pointer' }}
                >
                  <li className="h-[250px] w-[250px] border-solid border rounded-xl mb-8">
                    <POICard
                      name={poi.name}
                      address={poi.address}
                      pictureUrl={poi.pictureUrl}
                      description={poi.description}
                    />
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
        <div style={{ width: '100%', height: '100vh' }}>
          <MapModule />
        </div>
      </div>
    </div>
  );
};

export default POIList;
