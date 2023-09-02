import { useContext, useEffect, useState, useRef } from 'react';
import MapModule from '../../components/Map/MapModule';
import { IPOIData } from 'src/types/POIType';
import POICard, { goodWrittenType } from 'src/components/POICard';
import ModalAddPlace from 'src/components/ModalPois/ModalAddPlace';
import { useQuery } from '@apollo/client';
import { GET_POI_QUERY_BY_CITY } from 'src/services/queries/POIqueries';
import { UserContext } from 'src/contexts/userContext';
import { useParams } from 'react-router-dom';
import { GET_ALL_CITIES } from 'src/services/queries/cityQueries';
import { LatLngExpression } from 'leaflet';
import { getCurrentDimension } from 'src/components/Navbar';

const POIList = () => {
  const { user } = useContext(UserContext);
  const [openModalAddPlace, setOpenModalAddPlace] = useState(false);
  const [count, setCount] = useState(0);
  const params = useParams();
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const bottomEl = useRef<null | HTMLDivElement>(null);
  const [cities, setCities] = useState<
    {
      coordinates: LatLngExpression;
      id: number;
      name: string;
      __typename: string;
    }[]
  >([]);

  const {
    loading: getCitiesLoading,
    error: getCitiesError,
    data: getCitiesData,
  } = useQuery(GET_ALL_CITIES);

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

  const scrollToBottom = () => {
    bottomEl?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (getPoiData?.getAllPoiInCity) {
      const pois = [...getPoiData.getAllPoiInCity];
      setFilteredPois(pois.sort((a, b) => a.type.localeCompare(b.type)));
      setCount(pois.length);
      if (category) {
        setFilteredPois(pois.filter((poi: IPOIData) => poi.type === category));
      }
    }
    if (getCitiesData?.getAllCities) setCities(getCitiesData.getAllCities);
  }, [getPoiData, category, getCitiesData]);

  const city = cities?.filter((city) => city.id === Number(params.cityId))[0];

  useEffect(() => {
    setFilteredCount(filteredPois.length);
  }, [filteredPois.length]);

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener('resize', updateDimension);
    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, [screenSize]);

  if (getPoiLoading || getCitiesLoading) return <p>Chargement...</p>;
  if (getPoiError || getCitiesError)
    return <p>{getPoiError?.message || getCitiesError?.message}</p>;

  return (
    city && (
      <>
        <div className="mt-5 h-full w-full">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mx-5 my-3">
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
              style={{
                visibility:
                  user && user.role.name !== 'free_user' ? 'initial' : 'hidden',
              }}
            >
              {!openModalAddPlace ? 'Ajouter votre lieu' : "Annuler l'ajout"}
            </button>
            <select
              name="categories"
              id="categories"
              className="px-[15px] py-[4px] md:mr-[80px] mt-2 border-2 rounded-xl bg-transparent focus:border-gray-500 focus:outline-none focus:ring focus:ring-gray-300"
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
          <div className="flex flex-col md:flex-row pt-5 h-full">
            <div className="overflow-auto w-full md:w-[50%] md:h-[65vh]">
              {getPoiData.getAllPoiInCity.length === 0 ||
              filteredPois.length === 0 ? (
                <p className="py-4 w-4/5 my-3.5 mx-auto">
                  Pas de point d'intérêt renseigné pour l'instant.
                </p>
              ) : (
                <>
                  <ul
                    id="poi-list"
                    className="flex justify-around py-4 flex-wrap w-4/5 my-3.5 mx-auto"
                  >
                    {filteredPois &&
                      filteredPois.map((poi: IPOIData) => (
                        <li
                          className="h-[450px] w-[250px] border-solid border rounded-xl mb-12"
                          key={poi.id}
                          value={poi.id}
                          onClick={() => {
                            setZoomPoi(poi);
                            screenSize.width < 700 && scrollToBottom();
                          }}
                        >
                          <POICard key={poi.id} poi={poi} />
                        </li>
                      ))}
                  </ul>
                </>
              )}
            </div>
            <div
              ref={bottomEl}
              className="w-full md:w-[50%] h-[500px] md:h-[70vh] md:fixed md:right-0 md:top-[200px] mb-16 md:mb-0"
            >
              <MapModule poiData={filteredPois} zoomPoi={zoomPoi} city={city} />
            </div>
          </div>
        </div>
        {openModalAddPlace && (
          <ModalAddPlace
            setOpenModalAddPlace={setOpenModalAddPlace}
            openModalAddPlace={openModalAddPlace}
            city={city}
          />
        )}
      </>
    )
  );
};

export default POIList;
