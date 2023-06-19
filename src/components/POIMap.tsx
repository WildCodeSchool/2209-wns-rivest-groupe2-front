import { useContext, useEffect, useState } from 'react';
import POICard from './POICard';
import { useQuery } from '@apollo/client';
import { IPOIData } from 'src/types/POIType';
import { GET_USER_FAVORITES } from 'src/services/queries/userQueries';
import { GET_POI_QUERY } from 'src/services/queries/POIqueries';
import { FavoriteRateContext } from 'src/contexts/favoriteRateContext';

const POIMap = ({ userId }: { userId?: number }) => {
  const { favorites, setFavorites } = useContext(FavoriteRateContext);

  const [pois, setPois] = useState<IPOIData[] | []>([]);
  const { loading, error, data } = useQuery(GET_POI_QUERY);
  const {
    loading: userFavoritesLoading,
    error: userFavoritesError,
    data: userFavoritesData,
  } = useQuery(GET_USER_FAVORITES, {
    variables: { userId },
    skip: !userId,
  });

  useEffect(() => {
    if (data?.getAllPoi) {
      setPois(data.getAllPoi);
    }
  }, [data]);

  useEffect(() => {
    if (userFavoritesData?.getUserFavorites && userId !== undefined) {
      const initialFavorites: { [poiId: number]: number } = {};
      userFavoritesData.getUserFavorites.forEach(
        (favorite: { id: number; pointOfInterest: { id: number } }) => {
          initialFavorites[favorite.pointOfInterest.id] = favorite.id;
        }
      );
      setFavorites(initialFavorites);
    }
  }, [userFavoritesData, userId]);

  function handleAddFavorite(poiId: number, favoriteId: number) {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [poiId]: favoriteId,
    }));
  }

  function handleRemoveFavorite(poiId: number) {
    setFavorites((prevFavorites) => {
      const newFavorites = { ...prevFavorites };
      delete newFavorites[poiId];
      return newFavorites;
    });
  }

  function toggleFavorite(poiId: number, favoriteId: number | null) {
    if (favoriteId === null) {
      handleRemoveFavorite(poiId);
    } else {
      handleAddFavorite(poiId, favoriteId);
    }
  }

  return (
    <>
      {pois.map((poi) => (
        <POICard
          key={poi.id}
          poi={poi}
          isFavorite={favorites.hasOwnProperty(poi.id)}
          favoriteId={favorites[poi.id] || null}
          onToggleFavorite={toggleFavorite}
        />
      ))}
    </>
  );
};

export default POIMap;
