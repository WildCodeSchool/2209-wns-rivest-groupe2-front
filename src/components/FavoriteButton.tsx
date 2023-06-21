import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { TOGGLE_FAVORITE_MUTATION } from 'src/services/mutations/favoriteMutations';
import { GET_USER_FAVORITE_POI_QUERY } from 'src/services/queries/favoriteQueries';
import { IFavorite } from 'src/types/POIType';

interface FavoriteButtonProps {
  userId: number | null | undefined;
  poiId: number;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  userId,
  poiId,
  className,
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { loading, error, data } = useQuery(GET_USER_FAVORITE_POI_QUERY, {
    variables: { userId },
  });

  useEffect(() => {
    if (data) {
      const userFavorites = data.getUserFavorites.map(
        (favorite: IFavorite) => favorite.pointOfInterest.id
      );
      setIsFavorite(userFavorites.includes(poiId));
    }
  }, [data]);

  const [toggleFavoriteMutation] = useMutation(TOGGLE_FAVORITE_MUTATION, {
    variables: { userId, poiId },
    onCompleted: () => {
      setIsFavorite((prevIsFavorite) => !prevIsFavorite);
    },
  });

  if (!userId || loading) return null;
  if (error) return <p>Error :(</p>;

  return (
    <button onClick={() => toggleFavoriteMutation()} className={className}>
      {isFavorite ? (
        <FaHeart style={{ width: 20, height: 20 }} />
      ) : (
        <FaRegHeart style={{ width: 20, height: 20 }} />
      )}
    </button>
  );
};
