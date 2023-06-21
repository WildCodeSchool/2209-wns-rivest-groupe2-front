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
import { useContext } from 'react';
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

  return (
    <>
      <Card className="h-full flex flex-col justify-center items-center">
        <CardHeader>
          <div className="flex justify-between items-center">
            <Typography variant="h5" className="text-center">
              {name}
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="p-0 flex flex-col justify-center items-center relative">
          <div className="relative w-full">
            <img
              src={pictureUrl ? `${image_url}${pictureUrl[0]}` : noImage}
              alt={name}
              className="h-[100px] w-[90%] m-auto bg-cover bg-center"
            />
            {user && (
              <FavoriteButton
                userId={user?.id}
                poiId={id}
                className="absolute top-0 right-0"
              />
            )}
          </div>
          <Typography className="text-center text-xs font-normal text-blue-gray-400 pt-[10px]">
            {description.slice(0, 60)}...
          </Typography>
          <AverageRatingStar averageRate={averageRate} />
          {user?.id && (
            <StarRating
              className="border-2 flex items-center justify-center cursor-default"
              userId={user?.id}
              poiId={id}
            />
          )}
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
        </CardBody>
        <CardFooter divider className="flex items-center justify-between py-1">
          <Typography variant="small" className="text-center text-xs">
            {`${address}, ${postal} ${city}`}
          </Typography>
        </CardFooter>
      </Card>
    </>
  );
};

export default POICard;
