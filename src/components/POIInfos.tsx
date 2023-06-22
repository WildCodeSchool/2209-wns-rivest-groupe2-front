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
        <img
          src={pictureUrl ? `${image_url}${pictureUrl[0]}` : noImage}
          alt={name}
        />
        <img
          src={pictureUrl ? `${image_url}${pictureUrl[0]}` : noImage}
          alt={name}
        />
      </div>
      <div className="row-span-3 content-center py-10">
        <div>
          <Typography variant="h2" className="text-center">
            {name}
          </Typography>
        </div>
        <div>
          <Typography variant="h4" className="text-center">
            {address} {postal} {city}
          </Typography>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <div className="flex items-center">
            {/* <!-- Heroicon name: heart filled --> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="red"
              className="w-6 h-6"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            {/* <!-- Heroicon name: heart empty --> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="red"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </div>
          {/* <a
            href="#"
            className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            117 likes
          </a> */}
        </div>
      </div>
    </div>
  );
}
