import styles from '../../styles/legendComponent.module.css';

export const Legend = () => {
  return (
    <div className={styles.info}>
      <div className="flex items-center">
        <div className={styles.blackBox} />
        <p className={styles.legend}>Restaurant</p>
      </div>
      <div className="flex items-center">
        <div className={styles.blueBox} />
        <p className={styles.legend}>Fast-Food</p>
      </div>
      <div className="flex items-center">
        <div className={styles.goldBox} />
        <p className={styles.legend}>Bar</p>
      </div>
      <div className="flex items-center">
        <div className={styles.greenBox} />
        <p className={styles.legend}>Lieu de culte</p>
      </div>
      <div className="flex items-center">
        <div className={styles.orangeBox} />
        <p className={styles.legend}>Hôtel</p>
      </div>
      <div className="flex items-center">
        <div className={styles.purpleBox} />
        <p className={styles.legend}>Musée</p>
      </div>
      <div className="h-4" />
      <div className="flex items-center">
        <div className={styles.redBox} />
        <p className={styles.legend}>Lieu sélectionné</p>
      </div>
    </div>
  );
};

export default Legend;
