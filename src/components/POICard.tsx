import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';
import noImage from '../asset/img/no-image-icon.jpeg';
import { IPOICard } from 'src/types/POIType';
import { UserContext } from 'src/contexts/userContext';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AverageRatingStar } from './AverageRatingStar';
import { FavoriteButton } from './FavoriteButton';
import { ModalRedirectionAccess } from './ModalRedirectionAccess';
import defaultBar from 'src/asset/img/default-bar.jpg';
import defaultChurch from 'src/asset/img/default-church.jpg';
import defaultFastfood from 'src/asset/img/default-fastfood.jpg';
import defaultHotel from 'src/asset/img/default-hotel.jpg';
import defaultMuseum from 'src/asset/img/default-museum.jpg';
import defaultRestaurant from 'src/asset/img/default-restaurant.jpg';

interface POICardProps {
  poi: IPOICard;
}

export function goodWrittenType(type: string) {
  switch (type) {
    case 'restaurant':
      return 'Restaurant';
    case 'fast-food':
      return 'Fast Food';
    case 'bar':
      return 'Bar';
    case 'lieu de culte':
      return 'Lieu de culte';
    case 'hotel':
      return 'Hôtel';
    case 'musee':
      return 'Musée';
    default:
      return '';
  }
}

const image_url = process.env.REACT_APP_IMAGE_URL;

const POICard = (props: POICardProps) => {
  const {
    name,
    address,
    postal,
    city,
    pictureUrl,
    description,
    id,
    averageRate,
    type,
  } = props.poi;
  const { user } = useContext(UserContext);
  const [toggleHover, setToggleHover] = useState<boolean>(false);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  console.log('type', type);

  const getDefaultBackgroundImage = (type: string) => {
    switch (type) {
      case 'restaurant':
        return defaultRestaurant;
      case 'fast-food':
        return defaultFastfood;
      case 'bar':
        return defaultBar;
      case 'lieu de culte':
        return defaultChurch;
      case 'hotel':
        return defaultHotel;
      case 'musee':
        return defaultMuseum;
      default:
        return defaultRestaurant;
    }
  };

  return (
    <Card className="h-full relative">
      <CardHeader>
        <div className="w-full">
          <Typography variant="h5" className="text-center w-[90%]">
            {name}
          </Typography>
          {user && (
            <FavoriteButton
              userId={user?.id}
              poiId={id}
              className="absolute top-1 right-1 text-red-600"
              width="20px"
              height="20px"
              isFavorite={isFavorite}
              setIsFavorite={setIsFavorite}
            />
          )}
        </div>
      </CardHeader>
      <CardBody className="px-0 w-full flex flex-col justify-evenly items-center relative">
        <div className="relative w-full" style={{ overflow: 'hidden' }}>
          <div
            style={{
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: '120px',
              backgroundImage:
                pictureUrl && pictureUrl.length > 0
                  ? `url(${image_url}${pictureUrl[0]})`
                  : `url(${getDefaultBackgroundImage(type)})`,
              transition: 'all 0.5s ease-in-out',
              transform: toggleHover ? 'scale(1.3)' : 'scale(1)',
            }}
            onMouseEnter={() => setToggleHover(!toggleHover)}
            onMouseLeave={() => setToggleHover(!toggleHover)}
          />
        </div>
        <div className="w-[90%] flex flex-col justify-evenly h-[130px]">
          {description && (
            <Typography className="text-center text-xs font-normal text-blue-gray-400 pt-[10px]">
              {description.length > 60
                ? `${description.slice(0, 60)}...`
                : description}
            </Typography>
          )}
          {averageRate && (
            <div>
              <AverageRatingStar averageRate={averageRate} />
            </div>
          )}
          <Typography>
            {user?.role ? (
              <Link
                key={id}
                to={`/point-of-interest/${city.id}/${city.name}/${id}/${name}`}
                style={{ cursor: 'pointer' }}
              >
                <span className="text-xs text-blue-500 pt-3">
                  Voir plus de détails
                </span>
              </Link>
            ) : (
              <ModalRedirectionAccess
                header={
                  'Vous devez être connecté pour accéder au détail de cet établissement'
                }
              />
            )}
          </Typography>
        </div>
      </CardBody>
      <CardFooter divider className="w-full h-20 absolute bottom-0 left-0">
        <Typography variant="small" className="text-center text-xs">
          {`${address}, ${postal} ${city.name}`}
        </Typography>
      </CardFooter>
    </Card>
  );
};

export default POICard;
