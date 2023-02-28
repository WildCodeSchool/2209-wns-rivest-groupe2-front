import {
  Typography,
} from '@material-tailwind/react';
import { IPOIData } from 'src/types/POIType';

// interface Props {
//   name?: string;
//   address?: string;
//   description?: string;
//   // rates?: [];
// }

export default function POIInfos(props: IPOIData) {
  const { name, address, postal, city, pictureUrl, description, type, creationDate, priceRange, daysOpen, hoursOpen, hoursClose } = props;
  return (
    <div>
    <div className="h-full flex flex-col justify-between">
      <div>
        <Typography variant="h5" className="text-center">
          {name}
        </Typography>
      </div>
{/* Reviews */}
      <div className="mt-6">
          <h3 className="sr-only">Reviews</h3>
          <div className="flex items-center">
            <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117 reviews</a>
          </div>
      </div>
      <div className="p-3 flex flex-col justify-between">
        <Typography className="text-center text-xs font-normal text-blue-gray-400 pt-[10px]">
          {description}...
        </Typography>
      </div>
      <div className="flex items-center justify-between py-1">
        <Typography variant="small" className="text-center text-xs">
          {address}
        </Typography>
      </div>
    </div>
    </div>
  );
}
