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
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER_FAVORITE_POI_QUERY } from 'src/services/queries/favoriteQueries';
import { TOGGLE_FAVORITE_MUTATION } from 'src/services/mutations/favoriteMutations';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { IFavorite } from 'src/types/IFavorite';

interface POICardProps {
  poi: IPOICard;
  isFavorite: boolean;
  favoriteId: number | null;
  onToggleFavorite: (poiId: number, favoriteId: number | null) => void;
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

const POICard = (props: POICardProps) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { name, address, postal, city, pictureUrl, description, type, id } =
    props.poi;
  const { user } = useContext(UserContext);

  const { loading, error, data } = useQuery(GET_USER_FAVORITE_POI_QUERY, {
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

  const [toggleFavoriteMutation] = useMutation(TOGGLE_FAVORITE_MUTATION, {
    variables: { userId: user?.id, poiId: id },
    onCompleted: () => {
      setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      <Card className="h-full flex flex-col justify-between">
        <CardHeader>
          <div className="flex justify-between items-center">
            <Typography variant="h5" className="text-center">
              {name}
            </Typography>
            <button onClick={() => toggleFavoriteMutation()}>
              {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
            </button>
          </div>
        </CardHeader>
        <CardBody className="p-3 flex flex-col justify-between">
          <Typography className="text-center text-xl font-normal -pt-3">
            {goodWrittenType(type)}
          </Typography>
          <img
            src={pictureUrl ? `http://localhost:8000${pictureUrl[0]}` : noImage}
            alt={name}
            className="h-[100px] w-[90%] m-auto bg-cover bg-center"
          />
          <Typography className="text-center text-xs font-normal text-blue-gray-400 pt-[10px]">
            {description.slice(0, 60)}...
          </Typography>
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
