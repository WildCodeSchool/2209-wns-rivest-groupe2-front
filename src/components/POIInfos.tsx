import { useContext, useEffect, useState } from 'react';
import { UserContext } from 'src/contexts/userContext';
import { Typography } from '@material-tailwind/react';
import { IFavorite, IPOIData, OpeningHoursData } from 'src/types/POIType';
import moment from 'moment';
import { AverageRatingStar } from './AverageRatingStar';
import { FavoriteButton } from './FavoriteButton';
import { useQuery } from '@apollo/client';
import { GET_USER_FAVORITE_POI_QUERY } from 'src/services/queries/favoriteQueries';
import PictureVizualization from './PictureVizualization';
import { unknownHours } from 'src/services/helpers/POIDefaultDays';
import { Link } from 'react-router-dom';

interface POIInfoProps {
  poi: IPOIData;
  commentsCount: number;
  screenSize: {
    width: number;
    height: number;
  };
}

export default function POIInfos(props: POIInfoProps) {
  const {
    id,
    name,
    address,
    postal,
    city,
    pictureUrl,
    description,
    creationDate,
    openingHours,
    averageRate,
    websiteURL,
  } = props.poi;
  const { commentsCount, screenSize } = props;
  const { user } = useContext(UserContext);
  const [defaultOpeningHours, setDefaultOpeningHours] = useState<
    OpeningHoursData[]
  >([]);
  const image_url = process.env.REACT_APP_IMAGE_URL;

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { data } = useQuery(GET_USER_FAVORITE_POI_QUERY, {
    variables: { userId: user?.id },
  });

  useEffect(() => {
    if (openingHours.length === 0) {
      setDefaultOpeningHours(unknownHours);
    }
  }, [openingHours]);

  useEffect(() => {
    if (data) {
      const userFavorites = data.getUserFavorites.map(
        (favorite: IFavorite) => favorite.pointOfInterest.id
      );
      setIsFavorite(userFavorites.includes(id));
    }
  }, [data]);

  return (
    <>
      <div>
        <Typography
          variant="h1"
          className="pr-3 text-2xl md:text-6xl text-center md:text-left"
        >
          {name}
        </Typography>
        <Typography
          variant="h2"
          className="text-xl md:text-4xl text-center md:text-left"
        >
          {address}, {postal} {city.name}
        </Typography>
        {websiteURL && (
          <Typography className="text-center md:text-left">
            <Link
              to={websiteURL}
              target="_blank"
              className="text-blue-600 underline"
            >
              Site internet
            </Link>
          </Typography>
        )}
      </div>
      <div className="relative flex flex-col md:flex-row items-center">
        <AverageRatingStar
          averageRate={averageRate}
          className="flex justify-start pr-4"
        />
        <Typography className="pr-4">
          {commentsCount} {commentsCount > 1 ? 'commentaires' : 'commentaire'}
        </Typography>
        <Typography className="underline">
          Créé le {moment(creationDate).format('DD-MM-YYYY')}
        </Typography>
        <div>
          {user &&
            (!isFavorite ? (
              <div className="md:absolute md:-top-8 md:right-1 my-3 md:my-0 flex items-center p-4 bg-white border rounded-2xl">
                <p>Ajouter à vos favoris</p>
                <FavoriteButton
                  userId={user?.id}
                  poiId={id}
                  className="text-black pl-3"
                  width="20px"
                  height="20px"
                  isFavorite={isFavorite}
                  setIsFavorite={setIsFavorite}
                />
              </div>
            ) : (
              <div className="md:absolute md:-top-8 md:right-1 my-3 md:my-0 flex items-center p-3 bg-white border rounded">
                <p>Dans vos favoris</p>
                <FavoriteButton
                  userId={user?.id}
                  poiId={id}
                  className="text-black pl-3"
                  width="20px"
                  height="20px"
                  isFavorite={isFavorite}
                  setIsFavorite={setIsFavorite}
                />
              </div>
            ))}
        </div>
      </div>
      {pictureUrl?.length > 0 ? (
        screenSize.width >= 700 ? (
          <PictureVizualization poiImages={pictureUrl} />
        ) : (
          <div className="flex shrink-0 overflow-x-auto">
            {pictureUrl.map((picture) => (
              <div
                style={{
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  width: '120px',
                  minWidth: '120px',
                  height: '120px',
                  backgroundImage: `url(${image_url}${picture})`,
                  margin: '0 10px',
                }}
              />
            ))}
          </div>
        )
      ) : null}
      <div className="w-[80%] mx-auto mt-6">
        <div className="pt-8">
          <Typography variant="h2" className="text-xl md:text-4xl">
            Description du lieu
          </Typography>
          <p className="pt-2">
            {description?.length > 0
              ? description
              : 'Pas de description renseignée'}
          </p>
        </div>
        <div className="pt-8 mt-6">
          <Typography variant="h2" className="text-xl md:text-4xl">
            Horaires d'ouverture
          </Typography>
          <div className="w-full pt-5">
            <div className="flex justify-around pb-6">
              <ul>
                {openingHours.length > 0
                  ? openingHours.map((day: OpeningHoursData) => (
                      <li key={day.id} className="py-2">
                        {day.name}
                      </li>
                    ))
                  : defaultOpeningHours.map((day: OpeningHoursData) => (
                      <li key={day.id} className="py-2">
                        {day.name}
                      </li>
                    ))}
              </ul>
              <div className="flex h-full">
                <ul className="px-3">
                  {openingHours.length > 0
                    ? openingHours.map((day: OpeningHoursData) => (
                        <li key={day.id} className="py-2">
                          {day.hoursOpen[0]}
                          {day.hoursClose.length === 0
                            ? ''
                            : ` - ${day.hoursClose[0]}`}
                          {day.hoursOpen.length === 2 &&
                            day.hoursClose.length === 2 &&
                            `, ${day.hoursOpen[1]} - ${day.hoursClose[1]}`}
                        </li>
                      ))
                    : defaultOpeningHours.map((day: OpeningHoursData) => (
                        <li key={day.id} className="py-2">
                          {day.hoursOpen[0]}
                        </li>
                      ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
