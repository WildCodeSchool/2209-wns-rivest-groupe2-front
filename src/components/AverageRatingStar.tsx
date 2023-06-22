import { UserContext } from 'src/contexts/userContext';
import { useContext } from 'react';

interface AverageRatingStarProps {
  averageRate: number | null | undefined;
  className?: string;
}

export const AverageRatingStar: React.FC<AverageRatingStarProps> = (
  props: AverageRatingStarProps
) => {
  const { averageRate, className } = props;
  const { user } = useContext(UserContext);

  if (averageRate === null || averageRate === undefined) {
    return null;
  }

  const displayRate = (Math.round(averageRate * 10) / 10).toFixed(1);
  const numberRate = parseFloat(displayRate);

  return (
    <div
      className={
        className ? className : 'flex items-center justify-center m-auto'
      }
    >
      {numberRate !== 0 ? (
        <div className="h-9 flex items-center">
          <p className="text-gray-500 text-sm pr-1">{displayRate}</p>
          {Array.from({ length: Math.floor(numberRate) }).map((_, i) => (
            <span key={i} className="text-yellow-500 cursor-pointer text-xl">
              &#9733;
            </span>
          ))}
          {Array.from({ length: 5 - Math.floor(numberRate) }).map((_, i) => (
            <span
              key={i + numberRate}
              className="text-gray-500 cursor-pointer text-xl"
            >
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
{
  /* <div className="relative w-8 h-8">
      <AiFillStar
        size={32}
        color="gold"
        className="absolute"
        style={{ stroke: 'black', strokeWidth: '10px' }}
      />
      <p className="absolute inset-0 flex items-center justify-center font-bold text-gray-600">
        {displayRate}
      </p>
    </div> */
}
