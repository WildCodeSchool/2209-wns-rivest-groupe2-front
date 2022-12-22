import { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';

function MapComponent() {
  const map = useMap();
  return null;
}

const MapModule = () => {
  const parisPosition: LatLngExpression | undefined = [48.866667, 2.333333];
  return (
    <MapContainer
      center={parisPosition}
      zoom={13}
      scrollWheelZoom={false}
      style={{
        height: 500,
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: '10px',
        borderRadius: '10px',
      }}
    >
      <MapComponent />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {/* <Marker position={[45.764043, 4.835659]} /> */}
    </MapContainer>
  );
};

export default MapModule;
