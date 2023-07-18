import { useEffect, useState } from 'react';
import { IPOIData } from 'src/types/POIType';
import POIInfo from 'src/components/POIInfos';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import POICard from 'src/components/POICard';
import POIComments from 'src/components/POIComments';
import { Typography } from '@material-tailwind/react';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { GET_POI_QUERY } from 'src/services/queries/POIqueries';
import bgBar from 'src/asset/img/bg-bar.jpg';
import bgChurch from 'src/asset/img/bg-church.jpg';
import bgFastfood from 'src/asset/img/bg-fastfood.jpg';
import bgHotel from 'src/asset/img/bg-hotel.jpg';
import bgMuseum from 'src/asset/img/bg-museum.jpg';
import bgRestaurant from 'src/asset/img/bg-restaurant.jpg';
import MapModule from 'src/components/Map/MapModule';
import { GET_COMMENTS_NUMBER_PER_POI } from 'src/services/queries/commentQueries';
import ModalDeletePlace from 'src/components/ModalPois/ModalDeletePlace';
import ModalEditPlace from 'src/components/ModalPois/ModalEditPlace';

const POIDetails = () => {
  const [commentsCount, setCommentsCount] = useState(0);
  const [openModalEditPlace, setOpenModalEditPlace] = useState(false);
  const [openModalDeletePlace, setOpenModalDeletePlace] = useState(false);
  const params = useParams();
  const city = {
    id: Number(params.cityId),
    name: params.cityName,
  };

  const { loading, error, data } = useQuery(GET_POI_QUERY);
  const { poiId } = useParams();
  const thisPOI: IPOIData = data?.getAllPoi?.find(
    (poi: { id: number }) => poi.id === Number(poiId)
  );

  const { data: countCommentData } = useQuery(GET_COMMENTS_NUMBER_PER_POI, {
    variables: { poiId: Number(poiId) },
  });

  useEffect(() => {
    setCommentsCount(countCommentData?.getNumberOfCommentsPerPOI);
  }, [countCommentData?.getNumberOfCommentsPerPOI]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Une erreur est survenue :(</p>;

  if (!thisPOI) return <p>Pas de point d'intérêt renseigné avec ce nom</p>;

  const otherPOIs = data?.getAllPoi
    ?.filter((poi: { id: number }) => poi.id !== Number(poiId))
    .slice(0, 4);

  const categoryBackgroundStyle = {
    backgroundImage: `url(${getCategoryBackgroundImage(thisPOI.type)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    paddingLeft: '10em',
    paddingRight: '10em',
  };

  function getCategoryBackgroundImage(type: any) {
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
          className="center py-4 text-white capitalize text-center"
        >
          {thisPOI.type}
        </Typography>
        <div className="mx-auto bg-white drop-shadow-2xl relative">
          <div className="absolute top-3 right-3 flex items-center p-3 bg-white border rounded-2xl">
            <Tooltip title="Editer le point d'intéret">
              <IconButton onClick={() => setOpenModalEditPlace(true)}>
                <BorderColorIcon sx={{ color: 'black' }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Supprimer le point d'intéret">
              <IconButton onClick={() => setOpenModalDeletePlace(true)}>
                <DeleteIcon sx={{ color: 'black' }} />
              </IconButton>
            </Tooltip>
          </div>
          <ModalDeletePlace
            poiId={thisPOI.id}
            openDeleteDialog={openModalDeletePlace}
            handleDeleteDialogClose={() => setOpenModalDeletePlace(false)}
          />
          <nav aria-label="Breadcrumb" className="py-3 px-2">
            <ol
              role="list"
              className="flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              <li>
                <div className="flex items-center">
                  <a
                    href={`/point-of-interest/list/${thisPOI.city.id}/${thisPOI.city.name}`}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {thisPOI.city.name}
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
            <div className="px-10">
              <POIInfo poi={thisPOI} commentsCount={commentsCount} />
            </div>
            <div className="mt-6 mx-auto px-10">
              <POIComments
                averageRate={thisPOI?.averageRate || 0}
                commentsCount={commentsCount}
                comments={thisPOI.comments}
                poiId={thisPOI.id}
                type={thisPOI.type}
              />
            </div>
            <div className="mt-6 px-10 mx-auto">
              <div className="my-4 w-[80%] mx-auto pt-8">
                <Typography variant="h2">
                  Où se trouve le {thisPOI.type}
                </Typography>
                <div className="h-[500px] w-[100%]">
                  <MapModule poiData={[thisPOI]} />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 mx-auto px-10">
            {otherPOIs.length > 0 && (
              <div className="my-4 w-[80%] mx-auto">
                <Typography variant="h2">Vous aimerez peut-être...</Typography>
                <ul id="poi-similar" className="flex justify-start py-4 my-3.5">
                  {otherPOIs.map((poi: IPOIData) => (
                    <li
                      key={poi.id}
                      className="h-[400px] w-[250px] border-solid border rounded-xl mt-4 mb-12 mr-4"
                    >
                      <POICard key={poi.id} poi={poi} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      {openModalEditPlace && (
        <ModalEditPlace
          setOpenModalEditPlace={setOpenModalEditPlace}
          openModalEditPlace={openModalEditPlace}
          poi={thisPOI}
          city={city}
        />
      )}
    </div>
  );
};

export default POIDetails;
