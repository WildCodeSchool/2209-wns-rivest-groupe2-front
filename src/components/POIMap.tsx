import { useContext, useEffect, useState } from 'react';
import POICard from './POICard';
import { useQuery } from '@apollo/client';
import { IFavorite, IPOIData } from 'src/types/POIType';
import { GET_POI_QUERY } from 'src/services/queries/POIqueries';
import { GET_USER_FAVORITE_POI_QUERY } from 'src/services/queries/favoriteQueries';
import { UserContext } from 'src/contexts/userContext';

const POIMap = ({ favorite }: { favorite: boolean }) => {
  const [pois, setPois] = useState<IPOIData[] | []>([]);
  const [userFavoritePois, setUserFavoritePois] = useState<IPOIData[] | []>([]);
  const { user } = useContext(UserContext);
  const {
    loading: poiLoading,
    error: poiError,
    data: poiData,
  } = useQuery(GET_POI_QUERY);

  const {
    loading: favoriteLoading,
    error: favoriteError,
    data: favoriteData,
  } = useQuery(GET_USER_FAVORITE_POI_QUERY, {
    variables: { userId: user?.id },
  });

  useEffect(() => {
    if (poiData?.getAllPoi) {
      if (favoriteData?.getUserFavorites) {
        const userFavorites = favoriteData.getUserFavorites.map(
          (favorite: IFavorite) => favorite.pointOfInterest.id
        );
        setPois(
          poiData.getAllPoi.filter(
            (poi: IPOIData) => !userFavorites.includes(poi.id)
          )
        );
        setUserFavoritePois(
          poiData.getAllPoi.filter((poi: IPOIData) =>
            userFavorites.includes(poi.id)
          )
        );
      } else {
        setPois(poiData.getAllPoi);
      }
    }
  }, [poiData, favoriteData]);

  return !favorite ? (
    <>
      {poiLoading ? (
        <div>Chargement...</div>
      ) : poiError ? (
        <div>Erreur lors de la récupération des points d'intérêts :(</div>
      ) : pois.length > 0 ? (
        pois.map((poi) => (
          <div
            className="h-[400px] w-[250px] border-solid border rounded-xl mb-12"
            key={poi.id}
          >
            <POICard poi={poi} />
          </div>
        ))
      ) : pois.length === 0 && userFavoritePois.length === 0 ? (
        <div>Aucun point d'intérêt enregistré dans notre base de données</div>
      ) : (
        pois.length === 0 &&
        userFavoritePois.length > 0 && (
          <div>
            Aucun point d'intérêt enregistré dans notre base de données en plus
            de vos favoris
          </div>
        )
      )}
    </>
  ) : (
    <>
      {favoriteLoading ? (
        <div>Chargement...</div>
      ) : favoriteError ? (
        <div>
          Erreur lors de la récupération de vos points d'intérêts favoris :(
        </div>
      ) : userFavoritePois.length > 0 ? (
        userFavoritePois.map((poi) => (
          <div
            className="h-[400px] w-[250px] border-solid border rounded-xl mb-12"
            key={poi.id}
          >
            <POICard poi={poi} />
          </div>
        ))
      ) : (
        <div>Aucun point d'intérêt enregistré dans vos favoris</div>
      )}
    </>
  );
};

export default POIMap;
