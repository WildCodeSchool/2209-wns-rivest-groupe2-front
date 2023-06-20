import { useContext, useEffect, useState } from 'react';
import POICard from './POICard';
import { useQuery } from '@apollo/client';
import { IPOIData } from 'src/types/POIType';
import { GET_POI_QUERY } from 'src/services/queries/POIqueries';

const POIMap = ({ userId }: { userId?: number }) => {
  const [pois, setPois] = useState<IPOIData[] | []>([]);
  const { loading, error, data } = useQuery(GET_POI_QUERY);

  useEffect(() => {
    if (data?.getAllPoi) {
      setPois(data.getAllPoi);
    }
  }, [data]);

  return (
    <>
      {pois.map((poi) => (
        <POICard key={poi.id} poi={poi} />
      ))}
    </>
  );
};

export default POIMap;
