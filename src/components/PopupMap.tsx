import { Link } from 'react-router-dom';
import styles from '../styles/popUpMap.module.css';
import noImage from '../asset/img/no-image-icon.png';
import { useContext } from 'react';
import { UserContext } from 'src/contexts/userContext';
import { ModalRedirectionAccess } from './ModalRedirectionAccess';

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
  const { user, setUser } = useContext(UserContext);

  return (
    <div className={styles.popupContainer}>
      <img
        className={styles.poiImage}
        src={pictureUrl ? pictureUrl : noImage}
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
          <ModalRedirectionAccess header={"Vous devez être connecté pour accéder au détail de cet établissement"}/>
      )}
    </div>
  );
}

export default PopUpMap;
