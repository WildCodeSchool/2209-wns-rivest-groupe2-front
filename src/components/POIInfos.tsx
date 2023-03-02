import {
  Typography,
} from '@material-tailwind/react';
import { IPOIData } from 'src/types/POIType';
import noImage from '../asset/img/no-image-icon.png';

export default function POIInfos(props: IPOIData) {
  const { name, address, postal, city, pictureUrl, description, type, creationDate, priceRange, daysOpen, hoursOpen, hoursClose } = props;
  return (
    <div className="flex flex-row">
      <div className="h-full flex flex-col justify-between mr-10">
       <img
          src={pictureUrl ? pictureUrl : noImage}
          alt={name}
          className="h-[150px] w-[100%] m-auto bg-cover bg-center"
        />
      </div>
    <div className="h-full flex flex-col justify-between">
      <div>
        <Typography variant="h2" className="text-center">
          {name}
        </Typography>
      </div>
{/* Reviews */}
      <div className="mt-6">
          <h3 className="sr-only">Reviews</h3>
          <div className="flex items-center">
            <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">117 likes</a>
          </div>
      </div>
      <div className="flex items-center justify-between py-1">
        <Typography variant="h4" className="text-center">
          {address}
        </Typography>
      </div>
    </div>
    </div>
  );
}
