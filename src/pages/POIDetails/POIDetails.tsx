import { useContext } from 'react';
import { IPOIData } from 'src/types/POIType';
import POIInfo from 'src/components/POIInfos';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import POICard from 'src/components/POICard';
import POIComment from 'src/components/Comment';
import { Typography } from '@material-tailwind/react';
import { UserContext } from 'src/contexts/userContext';
import { GET_POI_QUERY } from 'src/services/queries/POIqueries';
import bgBar from 'src/asset/img/bg-bar.jpg';
import bgChurch from 'src/asset/img/bg-church.jpg';
import bgFastfood from 'src/asset/img/bg-fastfood.jpg';
import bgHotel from 'src/asset/img/bg-hotel.jpg';
import bgMuseum from 'src/asset/img/bg-museum.jpg';
import bgRestaurant from 'src/asset/img/bg-restaurant.jpg';

const POIDetails = () => {
  const { loading, error, data } = useQuery(GET_POI_QUERY);
  const { id } = useParams();
  const thisPOI = data?.getAllPoi?.find(
    (poi: { id: number }) => poi.id === Number(id)
  );

  const { user } = useContext(UserContext);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Une erreur est survenue :(</p>;

  if (!thisPOI) return <p>Pas de point d'interet</p>;

  const otherPOIs = data?.getAllPoi
    ?.filter((poi: { id: number }) => poi.id !== Number(id))
    .slice(0, 4);

  const categoryBackgroundStyle = {
    backgroundImage: `url(${getCategoryBackgroundImage(thisPOI.type)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    paddingTop: '5em',
    paddingLeft: '10em',
    paddingRight: '10em',
  };

  function getCategoryBackgroundImage(type: any) {
    // Define the background images for each category type
    switch (type) {
      case 'restaurant':
        return bgRestaurant;
      case 'fast-food':
        return bgFastfood;
      case 'bar':
        return bgBar;
      case 'lieu de culte':
        return bgChurch;
      case 'hotel':
        return bgHotel;
      case 'musee':
        return bgMuseum;
      default:
        return bgRestaurant;
    }
  }

  return (
    <div className="bg-white">
      <div style={categoryBackgroundStyle}>
        <Typography
          variant="h1"
          className="center text-white capitalize text-center"
        >
          {thisPOI.type}
        </Typography>
        <div className="mx-auto mb-16 bg-white drop-shadow-2xl">
          <nav aria-label="Breadcrumb" className="py-3">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              <li>
                <div className="flex items-center">
                  <a
                    href="/point-of-interest/list"
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    Paris
                  </a>
                  <svg
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
              <li className="text-sm">
                <a
                  href=""
                  aria-current="page"
                  className="font-medium capitalize text-gray-500 hover:text-gray-600"
                >
                  {thisPOI.name}
                </a>
              </li>
            </ol>
          </nav>
          <div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="col-span-1 lg:col-span-3 px-10">
                <POIInfo
                  id={thisPOI.id}
                  name={thisPOI.name}
                  address={thisPOI.address}
                  postal={thisPOI.postal}
                  city={thisPOI.city}
                  pictureUrl={thisPOI.pictureUrl}
                  description={thisPOI.description}
                  type={thisPOI.type}
                  coordinates={thisPOI.coordinates}
                  websiteURL={thisPOI.websiteURL}
                  creationDate={thisPOI.creationDate}
                  priceRange={thisPOI.priceRange}
                  daysOpen={thisPOI.daysOpen}
                  hoursOpen={thisPOI.hoursOpen}
                  hoursClose={thisPOI.hoursClose}
                />
              </div>
            </div>

            <div className="mt-4">
              {user && <POIComment poiId={thisPOI.id} userId={user.id} />}
            </div>
          </div>

          <div className="mt-4 mb-8 lg:row-span-3 lg:mt-10">
            {otherPOIs.length > 0 && (
              <>
                <h2 className="col-span-1 lg:col-span-3 px-10">
                  Vous aimerez peut-être...
                </h2>
                <ul
                  id="poi-similar"
                  className="flex justify-around py-4 my-3.5"
                >
                  {otherPOIs.map((poi: IPOIData) => (
                    <li className="h-[350px] w-[250px] border-solid border rounded-xl mb-12">
                      <POICard key={poi.id} poi={poi} />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default POIDetails;
