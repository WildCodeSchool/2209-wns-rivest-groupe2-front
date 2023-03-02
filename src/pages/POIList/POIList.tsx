import { useContext, useEffect, useState } from 'react';
import MapModule from '../../components/MapModule';
import { IPOIData } from 'src/types/POIType';
import POICard, { goodWrittenType } from 'src/components/POICard';
import ModalAddPlace from 'src/components/ModalAddPlace/ModalAddPlace';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { UserContext } from 'src/contexts/userContext';

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
  const { user } = useContext(UserContext);
  const [openModalAddPlace, setOpenModalAddPlace] = useState(false);
  const [count, setCount] = useState(0);

  const { loading, error, data } = useQuery(GET_POI_QUERY);

  const [category, setCategory] = useState<string>('');
  const [filteredPois, setFilteredPois] = useState<IPOIData[] | []>([]);
  const [filteredCount, setFilteredCount] = useState<number>(0);
  const [zoomPoi, setZoomPoi] = useState<IPOIData | void>();

  console.log('user', user);

  useEffect(() => {
    if (data?.getAllPoi) {
      setFilteredPois(data.getAllPoi);
      setCount(data.getAllPoi.length);
      if (category) {
        setFilteredPois(
          data.getAllPoi.filter((poi: IPOIData) => poi.type === category)
        );
      }
    }
  }, [data, category]);

  useEffect(() => {
    setFilteredCount(filteredPois.length);
  }, [filteredPois.length]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error.message}</p>;
  return (
    <div className="mt-5">
      <div className="flex justify-between mx-5">
        <strong className="py-[5px] pl-[80px]" id="results-number">
          {data.getAllPoi.length === 0
            ? "Aucun point d'intérêt à Paris"
            : data.getAllPoi.length > 0 && category !== ''
            ? `${filteredCount} ${goodWrittenType(category)}${
                filteredCount > 1 ? 's' : ''
              } à Paris`
            : `${count} Point${count > 1 ? 's' : ''} d'intérêt à Paris`}
        </strong>
        <button
          className="px-[15px] py-[4px] mt-2 rounded-xl border-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 font-secondary text-white text-[1rem] text-center font-semibold"
          onClick={() => setOpenModalAddPlace(!openModalAddPlace)}
          style={{ visibility: user?.type ? 'initial' : 'hidden' }}
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
          className="px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl focus:border-gray-500 focus:outline-none focus:ring focus:ring-gray-300"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Toutes les catégories</option>
          <option value="restaurant">Restaurant</option>
          <option value="fast-food">Fast-Food</option>
          <option value="bar">Bar</option>
          <option value="lieu de culte">Lieu de culte</option>
          <option value="hotel">Hôtel</option>
          <option value="musee">Musée</option>
        </select>
      </div>
      <div className="flex pt-5">
        <div className="h-[70vh] overflow-auto w-[50%]">
          {openModalAddPlace ? (
            <ModalAddPlace setOpenModalAddPlace={setOpenModalAddPlace} />
          ) : data.getAllPoi.length === 0 || filteredPois.length === 0 ? (
            <p className="py-4 w-4/5 my-3.5 mx-auto">
              Pas de point d'intérêt renseigné pour l'instant.
            </p>
          ) : (
            <ul
              id="poi-list"
              className="flex justify-around py-4 flex-wrap w-4/5 my-3.5 mx-auto"
            >
              {filteredPois &&
                filteredPois.map((poi: IPOIData) => (
                  <li
                    className="h-[250px] w-[250px] border-solid border rounded-xl mb-12"
                    key={poi.id}
                    value={poi.id}
                    onClick={() => setZoomPoi(poi)}
                  >
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
          <MapModule poiData={filteredPois} zoomPoi={zoomPoi} />
        </div>
      </div>
    </div>
  );
};

export default POIList;
