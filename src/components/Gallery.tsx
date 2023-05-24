import React from 'react';
import { poiData } from 'src/data/poi-data';
import { useParams } from 'react-router-dom';
import noImage from '../asset/img/no-image-icon.png';

interface Props {
  id: number;
  pictureUrls: string[];
}

export default function Gallery ({ id, pictureUrls}: Props ) {
// const {id} = useParams();
const thisPOI = poiData.find(poi => poi.id === Number(id));
// const listPictures = allpictures.map((pictureUrl) => 
// <p>{pictureUrl}</p>
// );

  return (
    <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      {pictureUrls.map((url, index) => (  
      <div className="h-full row-span-1 justify-between ">
        <img src={url || noImage}
           alt={`POI Image ${id}-${index}`}
           className="h-[100%] items-center"
        />
      </div>
      // <div className="h-full w-[100%] row-span-2">
      //   <img src={pictureUrl ? pictureUrl : noImage}
      //        alt={name}
      //   />
      //   <img src={pictureUrl ? pictureUrl : noImage}
      //        alt={name}
      //   />
      // </div>
      ))}
    </div>
  );
}