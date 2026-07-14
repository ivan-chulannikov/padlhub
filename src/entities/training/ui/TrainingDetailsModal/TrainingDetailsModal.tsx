import { formatDayHeading } from '@/shared/lib/date';
import type { Training } from '../../model/types';
import styles from './TrainingDetailsModal.module.css';

type TrainingDetailsModalProps = {
  training: Training;
  onClose: () => void;
};

const TrainingDetailsModal = ({ training, onClose }: TrainingDetailsModalProps) => (
  <div className={styles.backdrop} role="presentation" onMouseDown={onClose}>
    <section
      className={styles.modal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="training-title"
      onMouseDown={(event) => event.stopPropagation()}
    >
      <button className={styles.close} type="button" aria-label="Закрыть" onClick={onClose}>
        ×
      </button>
      <span className={styles.eyebrow}>Первая тренировка · бесплатно</span>
      <h2 id="training-title">{training.title}</h2>
      <div className={styles.date}>
        <strong>{formatDayHeading(training.date)}</strong>
        <span>
          {training.time} · {training.duration} минут
        </span>
      </div>
      <dl className={styles.details}>
        <div>
          <dt>Тип игры</dt>
          <dd>{training.type}</dd>
        </div>
        <div>
          <dt>Станция</dt>
          <dd>{training.station}</dd>
        </div>
        <div>
          <dt>Адрес</dt>
          <dd>{training.address}</dd>
        </div>
        <div>
          <dt>Корт</dt>
          <dd>{training.court}</dd>
        </div>
        <div>
          <dt>Тренер</dt>
          <dd>{training.coach}</dd>
        </div>
      </dl>
      <div className={styles.notice}>
        Приезжайте за 15 минут до начала, чтобы успеть переодеться и вовремя выйти на корт.
      </div>
      <button className={styles.action} type="button" onClick={onClose}>
        Закрыть
      </button>
      <p className={styles.caption}>Запись и оплата не входят в демо-версию.</p>
    </section>
  </div>
);

export default TrainingDetailsModal;
