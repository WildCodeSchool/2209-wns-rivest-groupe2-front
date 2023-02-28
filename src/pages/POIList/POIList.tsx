import { useEffect, useState } from 'react';
import MapModule from '../../components/MapModule';
import { IPOIData } from 'src/types/POIType';
import POICard from 'src/components/POICard';
import { Link } from 'react-router-dom';
import ModalAddPlace from 'src/components/ModalAddPlace/ModalAddPlace';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

export const GET_POI_QUERY = gql`
  query GetAllPois {
    getAllPoi {
      id
      name
      address
      postal
      type
      coordinates
      creationDate
      pictureUrl
      websiteURL
      description
      priceRange
      city
      daysOpen
      hoursOpen
      hoursClose
    }
  }
`;

const POIList = () => {
  const [openModalAddPlace, setOpenModalAddPlace] = useState(false);
  const [count, setCount] = useState(0);
  const { loading, error, data } = useQuery(GET_POI_QUERY);

  useEffect(() => {
    
    if (data?.getAllPoi) setCount(data.getAllPoi.length);
  }, [data]);
  if (loading) return <p>Chargement...</p>;console.log(error)
  if (error) return <p>Une erreur est survenue :(</p>;

  if (data.getAllPoi.length === 0)
    return (
      <div className="mt-5">
        <div className="flex justify-between mx-5">
          <strong className="py-[5px] pl-[80px]" id="results-number">
            {/* {count} résultat{count > 1 ? 's' : ''} de{' '}
          {poiData[0].type.toUpperCase()} à {city.toUpperCase()} */}
            Aucun point d'intérêt à Paris
          </strong>
          <button
            className="px-[15px] py-[4px] mt-2 rounded-xl border-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-secondary text-white text-[1rem] text-center font-semibold"
            onClick={() => setOpenModalAddPlace(!openModalAddPlace)}
          >
            {!openModalAddPlace ? 'Ajouter votre lieu' : "Annuler l'ajout"}
          </button>
          <select
            name="cities"
            id="cities"
            className="bg-gray-300 px-[15px] py-[4px] mt-2 border-2 rounded-xl"
            disabled
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
            className="bg-gray-300 px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl"
            disabled
          >
            <option value="Category">Catégorie</option>
            <option value="restaurant">Restaurant</option>
            <option value="fast-food">Fast-Food</option>
            <option value="bar">Bar</option>
            <option value="surch">Lieu de culte</option>
            <option value="hotel">Hôtel</option>
            <option value="museum">Musée</option>
          </select>
        </div>
        <div className="flex pt-5">
          <div className="h-[70vh] overflow-auto w-[50%]">
            {openModalAddPlace ? (
              <ModalAddPlace setOpenModalAddPlace={setOpenModalAddPlace} />
            ) : (
              <p className="py-4 w-4/5 my-3.5 mx-auto">
                Pas de point d'intérêt renseigné pour l'instant.
              </p>
            )}
          </div>
          <div
            style={{
              width: '50%',
              height: '85vh',
              position: 'fixed',
              right: 0,
              top: '150px',
            }}
          >
            <MapModule poiData={data.getAllPoi} />
          </div>
        </div>
      </div>
    );

  return (
    <div className="mt-5">
      <div className="flex justify-between mx-5">
        <strong className="py-[5px] pl-[80px]" id="results-number">
          {/* {count} résultat{count > 1 ? 's' : ''} de{' '}
          {poiData[0].type.toUpperCase()} à {city.toUpperCase()} */}
          {count} point{count > 1 ? 's' : ''} d'intérêt à Paris
        </strong>
        <button
          className="px-[15px] py-[4px] mt-2 rounded-xl border-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-secondary text-white text-[1rem] text-center font-semibold"
          onClick={() => setOpenModalAddPlace(!openModalAddPlace)}
        >
          {!openModalAddPlace ? 'Ajouter votre lieu' : "Annuler l'ajout"}
        </button>
        <select
          name="cities"
          id="cities"
          className="bg-gray-300 px-[15px] py-[4px] mt-2 border-2 rounded-xl"
          disabled
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
          className="bg-gray-300 px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl"
          disabled
        >
          <option value="Category">Catégorie</option>
          <option value="restaurant">Restaurant</option>
          <option value="fast-food">Fast-Food</option>
          <option value="bar">Bar</option>
          <option value="surch">Lieu de culte</option>
          <option value="hotel">Hôtel</option>
          <option value="museum">Musée</option>
        </select>
      </div>
      <div className="flex pt-5">
        <div className="h-[70vh] overflow-auto w-[50%]">
          {openModalAddPlace ? (
            <ModalAddPlace setOpenModalAddPlace={setOpenModalAddPlace} />
          ) : (
            <ul
              id="poi-list"
              className="flex justify-around py-4 flex-wrap w-4/5 my-3.5 mx-auto"
            >
              {data.getAllPoi.map((poi: IPOIData) => (
                <Link
                  key={poi.id}
                  to={`/point-of-interest/${poi.id}/${poi.name}`}
                  style={{ cursor: 'pointer' }}
                >
                  <li className="h-[250px] w-[250px] border-solid border rounded-xl mb-12">
                    <POICard
                      name={poi.name}
                      address={poi.address}
                      postal={poi.postal}
                      city={poi.city}
                      pictureUrl={poi.pictureUrl}
                      description={poi.description}
                      type={poi.type}
                    />
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </div>
        <div
          style={{
            width: '50%',
            height: '85vh',
            position: 'fixed',
            right: 0,
            top: '150px',
          }}
        >
          <MapModule poiData={data.getAllPoi} />
        </div>
      </div>
    </div>
  );
};

export default POIList;
