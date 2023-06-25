import React from 'react';

interface StarRatingProps {
  className?: string;
  userRate?: number;
  isEditing?: boolean;
  setUserRate?: React.Dispatch<React.SetStateAction<number>>;
}

const StarRating: React.FC<StarRatingProps> = ({
  className = '',
  userRate = 0,
  isEditing,
  setUserRate,
}) => {
  return (
    <div
      className={
        className ? className : 'flex items-center justify-center m-auto'
      }
    >
      {userRate !== undefined && userRate !== null && !isEditing ? (
        <div className="h-9 flex items-center">
          {Array.from({ length: userRate }).map((_, i) => (
            <span key={i} className="text-yellow-500 text-xl">
              &#9733;
            </span>
          ))}
          {Array.from({ length: 5 - userRate }).map((_, i) => (
            <span key={i + userRate} className="text-gray-500 text-xl">
              &#9733;
            </span>
          ))}
        </div>
      ) : setUserRate !== undefined && isEditing ? (
        <div className="h-9 flex items-center">
          {Array.from({ length: userRate }).map((_, i) => (
            <span
              key={i}
              onClick={() => setUserRate(i + 1)}
              className="text-yellow-500 cursor-pointer text-xl"
            >
              &#9733;
            </span>
          ))}
          {Array.from({ length: 5 - userRate }).map((_, i) => (
            <span
              key={i + userRate}
              onClick={() => setUserRate(i + 1)}
              className="text-gray-500 cursor-pointer text-xl"
            >
              &#9733;
            </span>
          ))}
        </div>
      ) : (
        <div className="h-9 flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-gray-500 text-xl">
              &#9734;
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default StarRating;
