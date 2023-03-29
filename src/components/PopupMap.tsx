import { Link } from 'react-router-dom';
import styles from '../styles/popUpMap.module.css';
import noImage from '../asset/img/no-image-icon.png';

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
    <div className={styles.popupContainer}>
      <img
        className={styles.poiImage}
        src={pictureUrl ? pictureUrl : noImage}
        alt={`${name} picture`}
      />
      <p className={styles.poiName}>{name}</p>
      <p className={styles.poiAdress}>{address}</p>
      <Link
        key={id}
        to={`/point-of-interest/${id}/${name}`}
        style={{ cursor: 'pointer' }}
      >
        <p className={styles.poiShowDetails}>Voir plus de détails</p>
      </Link>
    </div>
  );
}

export default PopUpMap;
