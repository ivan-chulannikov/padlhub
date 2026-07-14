import type { Training } from '../../model/types';
import styles from './TrainingCard.module.css';

type TrainingCardProps = {
  training: Training;
  onSelect: () => void;
};

const TrainingCard = ({ training, onSelect }: TrainingCardProps) => {
  const occupied = training.spotsTotal - training.spotsLeft;

  return (
    <article className={styles.card}>
      <div className={styles.time}>
        <time dateTime={`${training.date}T${training.time}`}>{training.time}</time>
        <span>{training.duration} мин</span>
      </div>

      <div className={styles.main}>
        <div className={styles.badges}>
          <span className={styles.badge}>Бесплатно</span>
          <span className={styles.typeBadge}>{training.type}</span>
        </div>
        <h4>{training.title}</h4>
        <p className={styles.location}>
          <span aria-hidden="true">⌖</span>
          {training.station} · {training.court}
        </p>
      </div>

      <div className={styles.coach}>
        <span className={styles.avatar} aria-hidden="true">
          {training.coach
            .split(' ')
            .map((part) => part[0])
            .join('')}
        </span>
        <span>
          <small>Тренер</small>
          {training.coach}
        </span>
      </div>

      <div className={styles.availability}>
        <div
          className={styles.spots}
          aria-label={`Свободно ${training.spotsLeft} из ${training.spotsTotal} мест`}
        >
          {Array.from({ length: training.spotsTotal }, (_, index) => (
            <span key={index} className={index < occupied ? styles.busy : styles.free} />
          ))}
        </div>
        <strong>{training.spotsLeft} места</strong>
        <span>свободно</span>
      </div>

      <button
        className={styles.button}
        type="button"
        aria-label={`Подробнее: ${training.type}, ${training.station}, ${training.date} в ${training.time}`}
        onClick={onSelect}
      >
        Подробнее
        <span aria-hidden="true">↗</span>
      </button>
    </article>
  );
};

export default TrainingCard;
