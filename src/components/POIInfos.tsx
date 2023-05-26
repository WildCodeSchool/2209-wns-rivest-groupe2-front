import { Typography } from '@material-tailwind/react';
import { IPOIData } from 'src/types/POIType';
import noImage from '../asset/img/no-image-icon.png';

const image_url = process.env.REACT_APP_IMAGE_URL;

export default function POIInfos(props: IPOIData) {
  const {
    name,
    address,
    postal,
    city,
    pictureUrl,
    description,
    type,
    creationDate,
    priceRange,
    daysOpen,
    hoursOpen,
    hoursClose,
  } = props;
  return (
    <div className="grid grid-cols-[1fr_0.5fr_1.5fr]">
      <div className="h-full row-span-1 justify-between ">
        <img
          src={pictureUrl ? `${image_url}${pictureUrl[0]}` : noImage}
          alt={name}
          className="h-[100%] items-center"
        />
      </div>
      <div className="h-full w-[100%] row-span-2">
        <img src={pictureUrl ? pictureUrl : noImage} alt={name} />
        <img src={pictureUrl ? pictureUrl : noImage} alt={name} />
      </div>
      <div className="row-span-3 content-center py-10">
        <div>
          <Typography variant="h2" className="text-center">
            {name}
          </Typography>
        </div>
        {/* Reviews */}
        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            117 likes
          </a>
        </div>
        <div>
          <Typography variant="h4" className="text-center">
            {address}
          </Typography>
        </div>
      </div>
    </div>
  );
}
