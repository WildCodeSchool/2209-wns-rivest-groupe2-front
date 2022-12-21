import { useState } from 'react';
import localisationPointer from '../../asset/img/localisation.png';
import MapModule from '../../components/MapModule';

const POIList = () => {
  const [userLocation, setUserLocation] = useState([0, 0]);

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((p) => {
        setUserLocation([p.coords.latitude, p.coords.longitude]);
      });
    }
  };
  return (
    <>
      <div className="mapContainer">
        <div>
          <img
            onClick={handleLocation}
            src={localisationPointer}
            alt="pointer localisation"
          />
        </div>
        <MapModule />
      </div>
    </>
  );
};

export default POIList;
