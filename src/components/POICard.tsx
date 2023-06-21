import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';
import noImage from '../asset/img/no-image-icon.png';
import { IPOICard } from 'src/types/POIType';
import StarRating from 'src/components/StarRating';
import { UserContext } from 'src/contexts/userContext';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AverageRatingStar } from './AverageRatingStar';
import { FavoriteButton } from './FavoriteButton';

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
    type,
    id,
    averageRate,
  } = props.poi;
  const { user } = useContext(UserContext);
  const [toggleHover, setToggleHover] = useState<boolean>(false);

  return (
    <>
      <Card className="h-full flex flex-col justify-between items-center relative">
        <CardHeader className="w-full absolute top-2">
          <div className="w-full">
            <Typography variant="h5" className="text-center w-[90%]">
              {name}
            </Typography>
            {user && (
              <FavoriteButton
                userId={user?.id}
                poiId={id}
                className="absolute top-1 right-1 text-red-600"
              />
            )}
          </div>
        </CardHeader>
        <CardBody className="px-0 mt-5 w-full h-[80%] flex flex-col justify-evenly items-center relative">
          <div className="relative w-full" style={{ overflow: 'hidden' }}>
            <div
              style={{
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100%',
                height: '150px',
                backgroundImage: pictureUrl
                  ? `url(${image_url}${pictureUrl[0]})`
                  : `url(${noImage})`,
                transition: 'all 0.5s ease-in-out',
                transform: toggleHover ? 'scale(1.3)' : 'scale(1)',
              }}
              onMouseEnter={() => setToggleHover(!toggleHover)}
              onMouseLeave={() => setToggleHover(!toggleHover)}
            />
          </div>
          <div className="w-[90%]">
            <Typography className="text-center text-xs font-normal text-blue-gray-400 pt-[10px]">
              {description &&
                (description.length > 60
                  ? `${description.slice(0, 60)}...`
                  : description)}
            </Typography>
            <div className="relative">
              <div className="absolute top-1 left-3">
                <AverageRatingStar averageRate={averageRate} />
              </div>

              {user?.id && (
                <StarRating
                  className="border-2 flex items-center justify-center cursor-default"
                  userId={user?.id}
                  poiId={id}
                />
              )}
            </div>

            <Typography>
              <Link
                key={id}
                to={`/point-of-interest/${id}/${name}`}
                style={{ cursor: 'pointer' }}
              >
                <span className="text-xs text-blue-500 pt-3">
                  Voir plus de détails
                </span>
              </Link>
            </Typography>
          </div>
        </CardBody>
        <CardFooter divider className="absolute bottom-0 left-0 w-full h-8">
          <Typography variant="small" className="text-center text-xs">
            {`${address}, ${postal} ${city}`}
          </Typography>
        </CardFooter>
      </Card>
    </>
  );
};

export default POICard;
