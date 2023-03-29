import L, { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import { IPOIData } from 'src/types/POIType';
import Legend from './MapLegend';
import PopUpMap from './PopupMap';

function MapComponent() {
  const map = useMap();
  return null;
}

const MapModule = ({
  poiData,
  zoomPoi,
}: {
  poiData: IPOIData[];
  zoomPoi: IPOIData | void;
}) => {
  const parisPosition: LatLngExpression = [48.88, 2.33];
  const zoom: number = 12;

  const restaurantIcon: L.Icon = new L.Icon({
    iconUrl: require('../asset/icons/marker-map/marker-icon-black.png'),
    iconSize: [25, 35],
    popupAnchor: [0, -20],
    shadowAnchor: [15, 20],
    shadowUrl: require('../asset/icons/marker-map/marker-shadow.png'),
  });
  const fastFoodIcon: L.Icon = new L.Icon({
    iconUrl: require('../asset/icons/marker-map/marker-icon-blue.png'),
    iconSize: [25, 35],
    popupAnchor: [0, -20],
    shadowAnchor: [15, 20],
    shadowUrl: require('../asset/icons/marker-map/marker-shadow.png'),
  });
  const barIcon: L.Icon = new L.Icon({
    iconUrl: require('../asset/icons/marker-map/marker-icon-gold.png'),
    iconSize: [25, 35],
    popupAnchor: [0, -20],
    shadowAnchor: [15, 20],
    shadowUrl: require('../asset/icons/marker-map/marker-shadow.png'),
  });
  const culteIcon: L.Icon = new L.Icon({
    iconUrl: require('../asset/icons/marker-map/marker-icon-green.png'),
    iconSize: [25, 35],
    popupAnchor: [0, -20],
    shadowAnchor: [15, 20],
    shadowUrl: require('../asset/icons/marker-map/marker-shadow.png'),
  });
  const hotelIcon: L.Icon = new L.Icon({
    iconUrl: require('../asset/icons/marker-map/marker-icon-orange.png'),
    iconSize: [25, 35],
    popupAnchor: [0, -20],
    shadowAnchor: [15, 20],
    shadowUrl: require('../asset/icons/marker-map/marker-shadow.png'),
  });
  const museeIcon: L.Icon = new L.Icon({
    iconUrl: require('../asset/icons/marker-map/marker-icon-violet.png'),
    iconSize: [25, 35],
    popupAnchor: [0, -20],
    shadowAnchor: [15, 20],
    shadowUrl: require('../asset/icons/marker-map/marker-shadow.png'),
  });
  const zoomIcon: L.Icon = new L.Icon({
    iconUrl: require('../asset/icons/marker-map/marker-icon-red.png'),
    iconSize: [25, 35],
    popupAnchor: [0, -20],
    shadowAnchor: [15, 20],
    shadowUrl: require('../asset/icons/marker-map/marker-shadow.png'),
  });
  const defaultIcon: L.Icon = new L.Icon({
    iconUrl: require('../asset/icons/marker-map/marker-icon-grey.png'),
    iconSize: [25, 35],
    popupAnchor: [0, -20],
    shadowAnchor: [15, 20],
    shadowUrl: require('../asset/icons/marker-map/marker-shadow.png'),
  });

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
      center={parisPosition}
      zoom={zoom}
      style={{
        height: '90%',
        margin: '30px 20px',
        zIndex: '10',
      }}
      id="map-container"
    >
      <MapComponent />
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Legend />
      {poiData.length > 0 &&
        poiData.map((poi: IPOIData) => (
          <div className="map-marker" key={poi.id}>
            {poi?.coordinates && zoomPoi?.id === poi?.id ? (
              <Marker position={poi.coordinates} icon={zoomIcon}>
                <Popup>
                  <PopUpMap
                    name={poi.name}
                    address={poi.address}
                    pictureUrl={poi.pictureUrl}
                    id={poi.id}
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
