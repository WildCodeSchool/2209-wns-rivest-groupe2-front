import { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import { poiData } from 'src/data/poi-data';
import PopUpMap from './PopupMap';

function MapComponent() {
  const map = useMap();
  return null;
}

const MapModule = () => {
  const parisPosition: LatLngExpression = [48.88, 2.33];

  return (
    <MapContainer
      center={parisPosition}
      zoom={13}
      style={{
        height: '100%',
        margin: '30px 20px',
      }}
      id="map-container"
    >
      <MapComponent />
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {poiData.map((poi) => (
        <div className="map-marker">
          <Marker key={poi.id} position={poi.coordinates}>
            <Popup>
              <PopUpMap
                name={poi.name}
                address={poi.address}
                pictureUrl={poi.pictureUrl}
                id={poi.id}
              />
            </Popup>
          </Marker>
        </div>
      ))}
    </MapContainer>
  );
};

export default MapModule;
