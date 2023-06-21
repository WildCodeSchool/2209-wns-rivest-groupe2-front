import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { RATE_POI_MUTATION } from 'src/services/mutations/rateMutations';
import { GET_USER_RATE_POI_QUERY } from 'src/services/queries/rateQueries';

interface StarRatingProps {
  className?: string;
  userId: number;
  poiId: number;
}

interface GetUserRateForPOIResult {
  getUserRateForPOI: {
    rate: number;
    userId: number;
    poiId: number;
  };
}

const StarRating: React.FC<StarRatingProps> = ({
  className = '',
  userId,
  poiId,
}) => {
  const [currentRating, setCurrentRating] = useState<number>();
  const { loading: userRateLoading, data: userRateData } = useQuery(
    GET_USER_RATE_POI_QUERY,
    {
      variables: { userId, poiId },
    }
  );

  const [ratePOI] = useMutation(RATE_POI_MUTATION, {
    update(cache, { data: { ratePOI } }) {
      // Update the cache with the new or updated POI rating
      const { getUserRateForPOI } = cache.readQuery({
        query: GET_USER_RATE_POI_QUERY,
        variables: { userId, poiId },
      }) as { getUserRateForPOI: { rate: number } };
      cache.writeQuery({
        query: GET_USER_RATE_POI_QUERY,
        variables: { userId, poiId },
        data: {
          getUserRateForPOI: { ...getUserRateForPOI, ...ratePOI },
        },
      });
      setCurrentRating(ratePOI.rate);
    },
  });

  useEffect(() => {
    if (userRateData?.getUserRateForPOI) {
      setCurrentRating(userRateData.getUserRateForPOI.rate);
    }
  }, [userRateData]);

  const handleRatingClick = async (newRating: number) => {
    const variables = {
      rate: newRating,
      userId,
      poiId,
    };
    try {
      const result = await ratePOI({ variables });
      setCurrentRating(result.data.ratePOI.rate);
    } catch (error) {
      console.log(error);
    }
  };

  if (userRateLoading) {
    return <div>Loading user rating...</div>;
  }

  return (
    <div
      className={
        className ? className : 'flex items-center justify-center m-auto'
      }
    >
      {currentRating !== undefined ? (
        <div className="h-9 flex items-center">
          {Array.from({ length: currentRating }).map((_, i) => (
            <span
              key={i}
              className="text-yellow-500 cursor-pointer text-xl"
              onClick={() => handleRatingClick(i + 1)}
            >
              &#9733;
            </span>
          ))}
          {Array.from({ length: 5 - currentRating }).map((_, i) => (
            <span
              key={i + currentRating}
              className="text-gray-500 cursor-pointer text-xl"
              onClick={() => handleRatingClick(i + currentRating + 1)}
            >
              &#9733;
            </span>
          ))}
        </div>
      ) : (
        <div className="h-9 flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className="text-gray-500 cursor-pointer text-xl"
              onClick={() => handleRatingClick(i + 1)}
            >
              &#9734;
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default StarRating;
