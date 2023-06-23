import React from 'react';

interface StarRatingProps {
  className?: string;
  userRate: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  className = '',
  userRate,
}) => {
  console.log(userRate);
  return (
    <div
      className={
        className ? className : 'flex items-center justify-center m-auto'
      }
    >
      {userRate !== undefined ? (
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
      ) : (
        <div className="h-9 flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-gray-500 cursor-pointer text-xl">
              &#9734;
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default StarRating;
