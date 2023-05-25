// AverageRatingStar.tsx
import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

interface AverageRatingStarProps {
  averageRate: number | null | undefined;
}

export const AverageRatingStar: React.FC<AverageRatingStarProps> = ({
  averageRate,
}) => {
  if (averageRate === null || averageRate === undefined) {
    return null;
  }

  // Checks if the average rate is a whole number and replaces it by it if it's the case
  const isWholeNumber = averageRate % 1 === 0;
  const displayRate = isWholeNumber
    ? Math.floor(averageRate)
    : averageRate.toFixed(1);

  return (
    <div className="relative w-8 h-8">
      <AiFillStar
        size={32}
        color="yellow"
        className="absolute"
        style={{ stroke: 'black', strokeWidth: '10px' }}
      />
      <p className="absolute inset-0 flex items-center justify-center font-bold text-gray-600">
        {displayRate}
      </p>
    </div>
  );
};
