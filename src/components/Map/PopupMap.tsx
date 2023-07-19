import { Link } from 'react-router-dom';
import styles from '../../styles/popUpMap.module.css';
import noImage from '../../asset/img/no-image-icon.jpeg';
import { ModalRedirectionAccess } from '../ModalRedirectionAccess';
import { UserContext } from 'src/contexts/userContext';
import { useContext } from 'react';

const image_url = process.env.REACT_APP_IMAGE_URL;

function PopUpMap({
  name,
  address,
  pictureUrl,
  id,
}: {
  name: string;
  address: string;
  pictureUrl: string[];
  id: number;
}) {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className={styles.popupContainer}>
      <img
        className={styles.poiImage}
        src={pictureUrl ? `${image_url}${pictureUrl[0]}` : noImage}
        alt={`${name} picture`}
      />
      <p className={styles.poiName}>{name}</p>
      <p className={styles.poiAdress}>{address}</p>
      {user?.role ? (
        <Link
          key={id}
          to={`/point-of-interest/${id}/${name}`}
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
