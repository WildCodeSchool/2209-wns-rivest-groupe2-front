import { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet';
import { IPOIData } from 'src/data/poi-data';
import PopUpMap from './PopupMap';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

function MapComponent() {
  const map = useMap();
  return null;
}

const MapModule = ({ poiData }: any) => {
  const parisPosition: LatLngExpression = [48.88, 2.33];
  /*   const provider = new OpenStreetMapProvider();
  const results = provider.search({ query: 'rue de rivoli 75001 paris' });
  results.then((res) => console.log(res)); */

  return (
    <MapContainer
      center={parisPosition}
      zoom={12}
      style={{
        height: '90%',
        margin: '30px 20px',
      }}
      id="map-container"
    >
      <MapComponent />
      <TileLayer
        url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {poiData.map((poi: IPOIData) => (
        <div className="map-marker" key={poi.id}>
          {poi.coordinates ? (
            <Marker position={poi.coordinates}>
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
