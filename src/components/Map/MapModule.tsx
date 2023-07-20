import { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import { IPOIData } from 'src/types/POIType';
import { Legend } from './MapLegend';
import PopUpMap from './PopupMap';
import {
  restaurantIcon,
  fastFoodIcon,
  barIcon,
  culteIcon,
  hotelIcon,
  museeIcon,
  zoomIcon,
  defaultIcon,
} from './MapIcons';
import { useEffect, useRef } from 'react';

function MapComponent() {
  const map = useMap();
  return null;
}

const MapModule = ({
  poiData,
  zoomPoi,
  city,
}: {
  poiData: IPOIData[];
  zoomPoi?: IPOIData | void;
  city: {
    coordinates: LatLngExpression;
    id: number;
    name: string;
    __typename: string;
  };
}) => {
  const zoom: number = 12;
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const position = city.coordinates;

  useEffect(() => {
    if (zoomPoi) {
      const map = mapRef.current;
      if (!map) {
        return;
      }

      const marker: any = markerRef.current;
      if (marker) {
        marker.openPopup();
      }
    }
  }, [zoomPoi]);

  function switchIcon(poi: IPOIData) {
    switch (poi.type) {
      case 'restaurant':
        return restaurantIcon;
      case 'fast-food':
        return fastFoodIcon;
      case 'bar':
        return barIcon;
      case 'lieu de culte':
        return culteIcon;
      case 'hotel':
        return hotelIcon;
      case 'musee':
        return museeIcon;
      default:
        return defaultIcon;
    }
  }

  return (
    <MapContainer
      center={position}
      zoom={zoom}
      style={{
        height: '90%',
        margin: '30px 20px',
        zIndex: '10',
      }}
      id="map-container"
      // @ts-ignore
      whenReady={(map: any) => {
        mapRef.current = map;
      }}
    >
      <MapComponent />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Legend />
      {poiData.length > 0 &&
        poiData.map((poi: IPOIData) => (
          <div className="map-marker" key={poi.id}>
            {poi?.coordinates && zoomPoi?.id === poi?.id ? (
              <Marker
                position={poi.coordinates}
                icon={zoomIcon}
                ref={markerRef}
              >
                <Popup>
                  <PopUpMap
                    name={poi.name}
                    address={poi.address}
                    pictureUrl={poi.pictureUrl}
                    id={poi.id}
                    city={city}
                  />
                </Popup>
              </Marker>
            ) : poi?.coordinates ? (
              <Marker position={poi.coordinates} icon={switchIcon(poi)}>
                <Popup>
                  <PopUpMap
                    name={poi.name}
                    address={poi.address}
                    pictureUrl={poi.pictureUrl}
                    id={poi.id}
                    city={city}
                  />
                </Popup>
              </Marker>
            ) : null}
          </div>
        ))}
    </MapContainer>
  );
};

export default MapModule;
