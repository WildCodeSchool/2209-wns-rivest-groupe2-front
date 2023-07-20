import { Link } from 'react-router-dom';
import styles from '../../styles/popUpMap.module.css';
import noImage from '../../asset/img/no-image-icon.jpeg';
import { ModalRedirectionAccess } from '../ModalRedirectionAccess';
import { UserContext } from 'src/contexts/userContext';
import { useContext } from 'react';
import { LatLngExpression } from 'leaflet';
import defaultBar from 'src/asset/img/default-bar.jpg';
import defaultChurch from 'src/asset/img/default-church.jpg';
import defaultFastfood from 'src/asset/img/default-fastfood.jpg';
import defaultHotel from 'src/asset/img/default-hotel.jpg';
import defaultMuseum from 'src/asset/img/default-museum.jpg';
import defaultRestaurant from 'src/asset/img/default-restaurant.jpg';

const image_url = process.env.REACT_APP_IMAGE_URL;

function PopUpMap({
  name,
  address,
  pictureUrl,
  id,
  city,
  type,
  postal,
}: {
  name: string;
  address: string;
  pictureUrl: string[];
  id: number;
  city: {
    coordinates: LatLngExpression;
    id: number;
    name: string;
    __typename: string;
  };
  type: string;
  postal: string;
}) {
  const { user } = useContext(UserContext);

  const getDefaultBackgroundImage = (type: string) => {
    switch (type) {
      case 'restaurant':
        return defaultRestaurant;
      case 'fast-food':
        return defaultFastfood;
      case 'bar':
        return defaultBar;
      case 'lieu de culte':
        return defaultChurch;
      case 'hotel':
        return defaultHotel;
      case 'musee':
        return defaultMuseum;
      default:
        return defaultRestaurant;
    }
  };

  return (
    <div className={styles.popupContainer}>
      <img
        className={styles.poiImage}
        src={
          pictureUrl
            ? `${image_url}${pictureUrl[0]}`
            : getDefaultBackgroundImage(type)
        }
        alt={`${name} picture`}
      />
      <p className={styles.poiName}>{name}</p>
      <p className={styles.poiAdress}>
        {address}, {postal} {city.name}
      </p>
      {user?.role ? (
        <Link
          key={id}
          to={`/point-of-interest/${city.id}/${city.name}/${id}/${name}`}
          style={{ cursor: 'pointer' }}
        >
          <p className={styles.poiShowDetails}>Voir plus de détails</p>
        </Link>
      ) : (
        <ModalRedirectionAccess
          header={
            'Vous devez être connecté pour accéder au détail de cet établissement'
          }
        />
      )}
    </div>
  );
}

export default PopUpMap;
