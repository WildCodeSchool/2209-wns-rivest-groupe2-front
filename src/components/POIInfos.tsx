import { useContext, useEffect, useState } from 'react';
import { UserContext } from 'src/contexts/userContext';
import { Typography } from '@material-tailwind/react';
import { IFavorite, IPOIData, OpeningHoursData } from 'src/types/POIType';
import moment from 'moment';
import { AverageRatingStar } from './AverageRatingStar';
import POIImage from './POIImage';
import { FavoriteButton } from './FavoriteButton';
import { useQuery } from '@apollo/client';
import { GET_USER_FAVORITE_POI_QUERY } from 'src/services/queries/favoriteQueries';

interface POIInfoProps {
  poi: IPOIData;
  commentsCount: number;
}

const image_url = process.env.REACT_APP_IMAGE_URL;

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
  } = props.poi;
  const { commentsCount } = props;
  const { user } = useContext(UserContext);

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { data } = useQuery(GET_USER_FAVORITE_POI_QUERY, {
    variables: { userId: user?.id },
  });

  useEffect(() => {
    if (data) {
      const userFavorites = data.getUserFavorites.map(
        (favorite: IFavorite) => favorite.pointOfInterest.id
      );
      setIsFavorite(userFavorites.includes(id));
    }
  }, [data]);

  const firstImage: string[] =
    pictureUrl && pictureUrl.length > 0 ? pictureUrl.slice(0, 1) : [];
  const otherImages: string[] =
    pictureUrl && pictureUrl.length > 1 ? pictureUrl.slice(1) : [];

  return (
    <>
      <div>
        <Typography variant="h1" className="pr-3">
          {name}
        </Typography>
        <Typography variant="h2">
          {address}, {postal} {city}
        </Typography>
      </div>
      <div className="relative flex items-center">
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
              <div className="absolute -top-8 right-1 flex items-center p-3 bg-white border rounded">
                <p>Ajouter à vos favoris</p>
                <FavoriteButton
                  userId={user?.id}
                  poiId={id}
                  className="text-black pl-3"
                  width="20px"
                  height="20px"
                />
              </div>
            ) : (
              <FavoriteButton
                userId={user?.id}
                poiId={id}
                className="absolute top-0 right-1 text-red-500"
                width="30px"
                height="30px"
              />
            ))}
        </div>
      </div>
      {pictureUrl?.length > 1 ? (
        <div className="relative">
          <div className="grid gap-4 grid-cols-4 grid-rows-2 grid-flow-row">
            <POIImage
              backgroundImage={`url(${image_url}${firstImage[0]})`}
              className="col-span-2 row-span-2"
              height="316px"
            />
            {otherImages?.length > 0 &&
              otherImages.map((image) => (
                <POIImage
                  backgroundImage={`url(${image_url}${image})`}
                  height="150px"
                  key={image}
                />
              ))}
          </div>
        </div>
      ) : pictureUrl?.length === 1 ? (
        <POIImage
          backgroundImage={`url(${image_url}${pictureUrl[0]})`}
          className="col-span-2 row-span-2"
          height="316px"
        />
      ) : null}
      <div className="w-[80%] mx-auto mt-6">
        <div className="pt-8">
          <Typography variant="h2">Description du lieu</Typography>
          <p className="pt-2">
            {description?.length > 0
              ? description
              : 'Pas de description renseignée'}
          </p>
        </div>
        <div className="pt-8 mt-6">
          <Typography variant="h2">Horaires d'ouverture</Typography>
          <div className="w-full pt-5">
            <div className="flex justify-around pb-6">
              <ul>
                {openingHours.map((day: OpeningHoursData) => (
                  <li key={day.id} className="py-2">
                    {day.name}
                  </li>
                ))}
              </ul>
              <div className="flex h-full">
                <ul className="px-3">
                  {openingHours.map((day: OpeningHoursData) => (
                    <li key={day.id} className="py-2">
                      {day.hoursOpen[0]}
                      {day.hoursClose.length === 0
                        ? ''
                        : ` - ${day.hoursClose[0]}`}
                      {day.hoursOpen.length === 2 &&
                        day.hoursClose.length === 2 &&
                        `, ${day.hoursOpen[1]} - ${day.hoursClose[1]}`}
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
