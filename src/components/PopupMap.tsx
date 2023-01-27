import '../styles/PopUpMap.css';

function PopUpMap({
  name,
  address,
  pictureUrl,
  id,
}: {
  name: string;
  address: string;
  pictureUrl: string;
  id: number;
}) {
  return (
    <div className="popupContainer">
      <img className="poiImage" src={pictureUrl} alt={`${name} picture`} />
      <p className="poiName">{name}</p>
      <p className="poiAdress">{address}</p>
      <p className="poiShowDetails">Show more details</p>
    </div>
  );
}

export default PopUpMap;
