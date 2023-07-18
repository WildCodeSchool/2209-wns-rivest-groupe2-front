import { useContext, useEffect, useState } from 'react';
import MapModule from '../../components/Map/MapModule';
import { IPOIData } from 'src/types/POIType';
import POICard, { goodWrittenType } from 'src/components/POICard';
import ModalAddPlace from 'src/components/ModalPois/ModalAddPlace';
import { useQuery } from '@apollo/client';
import { GET_POI_QUERY_BY_CITY } from 'src/services/queries/POIqueries';
import { UserContext } from 'src/contexts/userContext';
import { useParams } from 'react-router-dom';

const POIList = () => {
  const { user } = useContext(UserContext);
  const [openModalAddPlace, setOpenModalAddPlace] = useState(false);
  const [count, setCount] = useState(0);
  const params = useParams();

  const city = {
    id: Number(params.cityId),
    name: params.cityName,
  };

  const {
    loading: getPoiLoading,
    error: getPoiError,
    data: getPoiData,
  } = useQuery(GET_POI_QUERY_BY_CITY, {
    variables: { cityId: Number(params.cityId) },
  });

  const [category, setCategory] = useState<string>('');
  const [filteredPois, setFilteredPois] = useState<IPOIData[] | []>([]);
  const [filteredCount, setFilteredCount] = useState<number>(0);
  const [zoomPoi, setZoomPoi] = useState<IPOIData | void>();
  const [barPois, setBarPois] = useState<IPOIData[] | []>([]);
  const [restaurantPois, setRestaurantPois] = useState<IPOIData[] | []>([]);
  const [fastFoodPois, setFastFoodPois] = useState<IPOIData[] | []>([]);
  const [cultePois, setCultePois] = useState<IPOIData[] | []>([]);
  const [hotelPois, setHotelPois] = useState<IPOIData[] | []>([]);
  const [museumPois, setMuseumPois] = useState<IPOIData[] | []>([]);

  useEffect(() => {
    if (getPoiData?.getAllPoiInCity) {
      const pois = [...getPoiData.getAllPoiInCity];
      setFilteredPois(pois);
      setBarPois(pois.filter((poi: IPOIData) => poi.type === 'bar'));
      setRestaurantPois(
        pois.filter((poi: IPOIData) => poi.type === 'restaurant')
      );
      setFastFoodPois(pois.filter((poi: IPOIData) => poi.type === 'fast-food'));
      setCultePois(
        pois.filter((poi: IPOIData) => poi.type === 'lieu de culte')
      );
      setHotelPois(pois.filter((poi: IPOIData) => poi.type === 'hotel'));
      setMuseumPois(pois.filter((poi: IPOIData) => poi.type === 'musee'));
      setCount(pois.length);
      if (category) {
        setFilteredPois(pois.filter((poi: IPOIData) => poi.type === category));
      }
    }
  }, [getPoiData, category]);

  useEffect(() => {
    setFilteredCount(filteredPois.length);
  }, [filteredPois.length]);

  if (getPoiLoading) return <p>Chargement...</p>;
  if (getPoiError) return <p>{getPoiError.message}</p>;

  return (
    <>
      <div className="mt-5 h-full w-full">
        <div className="flex justify-between items-center mx-5 my-3">
          <strong className="py-[5px] pl-[80px]" id="results-number">
            {getPoiData.getAllPoiInCity.length === 0
              ? `Aucun point d'intérêt à ${city.name}`
              : getPoiData.getAllPoiInCity.length > 0 && category !== ''
              ? `${filteredCount} ${goodWrittenType(category)}${
                  filteredCount > 1 ? 's' : ''
                } à ${city.name}`
              : `${count} Point${count > 1 ? 's' : ''} d'intérêt à ${
                  city.name
                }`}
          </strong>
          <button
            className="px-[15px] py-[4px] mt-2 rounded-xl border-2 bg-gradient-to-r from-opalblue to-opalblue hover:from-opalblue hover:to-blue-500 font-secondary text-white text-[1rem] text-center font-semibold"
            onClick={() => setOpenModalAddPlace(!openModalAddPlace)}
            style={{ visibility: user?.type ? 'initial' : 'hidden' }}
          >
            {!openModalAddPlace ? 'Ajouter votre lieu' : "Annuler l'ajout"}
          </button>
          <select
            name="categories"
            id="categories"
            className="px-[15px] py-[4px] mr-[80px] mt-2 border-2 rounded-xl bg-transparent focus:border-gray-500 focus:outline-none focus:ring focus:ring-gray-300"
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
        <div className="flex pt-5 h-full">
          <div style={{ height: '65vh' }} className="overflow-auto w-[50%]">
            {getPoiData.getAllPoiInCity.length === 0 ||
            filteredPois.length === 0 ? (
              <p className="py-4 w-4/5 my-3.5 mx-auto">
                Pas de point d'intérêt renseigné pour l'instant.
              </p>
            ) : (
              <>
                {category !== '' ? (
                  <ul
                    id="poi-list"
                    className="flex justify-around py-4 flex-wrap w-4/5 my-3.5 mx-auto"
                  >
                    {filteredPois &&
                      filteredPois.map((poi: IPOIData) => (
                        <li
                          className="h-[400px] w-[250px] border-solid border rounded-xl mb-12"
                          key={poi.id}
                          value={poi.id}
                          onClick={() => setZoomPoi(poi)}
                        >
                          <POICard key={poi.id} poi={poi} />
                        </li>
                      ))}
                  </ul>
                ) : null}
                {barPois.length > 0 && category === '' && (
                  <>
                    <h3 className="pl-8 text-3xl font-bold">Les Bars</h3>
                    <ul
                      id="poi-list-bar"
                      className="flex justify-around py-4 flex-wrap w-4/5 my-3.5 mx-auto"
                    >
                      {barPois &&
                        barPois.map((poi: IPOIData) => (
                          <li
                            className="h-[400px] w-[250px] border-solid border rounded-xl mb-12"
                            key={poi.id}
                            value={poi.id}
                            onClick={() => setZoomPoi(poi)}
                          >
                            <POICard key={poi.id} poi={poi} />
                          </li>
                        ))}
                    </ul>
                  </>
                )}
                {fastFoodPois.length > 0 && category === '' && (
                  <>
                    <h3 className="pl-8 text-3xl font-bold">Les Fast Food</h3>
                    <ul
                      id="poi-list-fastfood"
                      className="flex justify-around py-4 flex-wrap w-4/5 my-3.5 mx-auto"
                    >
                      {fastFoodPois &&
                        fastFoodPois.map((poi: IPOIData) => (
                          <li
                            className="h-[400px] w-[250px] border-solid border rounded-xl mb-12"
                            key={poi.id}
                            value={poi.id}
                            onClick={() => setZoomPoi(poi)}
                          >
                            <POICard key={poi.id} poi={poi} />
                          </li>
                        ))}
                    </ul>
                  </>
                )}
                {hotelPois.length > 0 && category === '' && (
                  <>
                    <h3 className="pl-8 text-3xl font-bold">Les Hôtels</h3>
                    <ul
                      id="poi-list-hotel"
                      className="flex justify-around py-4 flex-wrap w-4/5 my-3.5 mx-auto"
                    >
                      {hotelPois &&
                        hotelPois.map((poi: IPOIData) => (
                          <li
                            className="h-[400px] w-[250px] border-solid border rounded-xl mb-12"
                            key={poi.id}
                            value={poi.id}
                            onClick={() => setZoomPoi(poi)}
                          >
                            <POICard key={poi.id} poi={poi} />
                          </li>
                        ))}
                    </ul>
                  </>
                )}
                {cultePois.length > 0 && category === '' && (
                  <>
                    <h3 className="pl-8 text-3xl font-bold">
                      Les Lieux de culte
                    </h3>
                    <ul
                      id="poi-list-culte"
                      className="flex justify-around py-4 flex-wrap w-4/5 my-3.5 mx-auto"
                    >
                      {cultePois &&
                        cultePois.map((poi: IPOIData) => (
                          <li
                            className="h-[400px] w-[250px] border-solid border rounded-xl mb-12"
                            key={poi.id}
                            value={poi.id}
                            onClick={() => setZoomPoi(poi)}
                          >
                            <POICard key={poi.id} poi={poi} />
                          </li>
                        ))}
                    </ul>
                  </>
                )}
                {museumPois.length > 0 && category === '' && (
                  <>
                    <h3 className="pl-8 text-3xl font-bold">Les Musées</h3>
                    <ul
                      id="poi-list-museum"
                      className="flex justify-around py-4 flex-wrap w-4/5 my-3.5 mx-auto"
                    >
                      {museumPois &&
                        museumPois.map((poi: IPOIData) => (
                          <li
                            className="h-[400px] w-[250px] border-solid border rounded-xl mb-12"
                            key={poi.id}
                            value={poi.id}
                            onClick={() => setZoomPoi(poi)}
                          >
                            <POICard key={poi.id} poi={poi} />
                          </li>
                        ))}
                    </ul>
                  </>
                )}
                {restaurantPois.length > 0 && category === '' && (
                  <>
                    <h3 className="pl-8 text-3xl font-bold">Les Restaurants</h3>
                    <ul
                      id="poi-list-restaurant"
                      className="flex justify-around py-4 flex-wrap w-4/5 my-3.5 mx-auto"
                    >
                      {restaurantPois &&
                        restaurantPois.map((poi: IPOIData) => (
                          <li
                            className="h-[400px] w-[250px] border-solid border rounded-xl mb-12"
                            key={poi.id}
                            value={poi.id}
                            onClick={() => setZoomPoi(poi)}
                          >
                            <POICard key={poi.id} poi={poi} />
                          </li>
                        ))}
                    </ul>
                  </>
                )}
              </>
            )}
          </div>
          <div
            style={{
              width: '50%',
              height: '70vh',
              position: 'fixed',
              right: 0,
              top: '200px',
            }}
          >
            <MapModule poiData={filteredPois} zoomPoi={zoomPoi} />
          </div>
        </div>
      </div>
      {openModalAddPlace && city && (
        <ModalAddPlace
          setOpenModalAddPlace={setOpenModalAddPlace}
          openModalAddPlace={openModalAddPlace}
          city={city}
        />
      )}
    </>
  );
};

export default POIList;
