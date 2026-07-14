import { useEffect, useId, useRef } from 'react';
import { formatDayHeading } from '@/shared/lib/date';
import type { Training } from '../../model/types';
import styles from './TrainingDetailsModal.module.css';

type TrainingDetailsModalProps = {
  training: Training;
  onClose: () => void;
};

const TrainingDetailsModal = ({ training, onClose }: TrainingDetailsModalProps) => {
  const modalRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const previouslyFocusedElement = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), [href], [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedElement?.focus();
    };
  }, [onClose]);

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <button
          ref={closeButtonRef}
          className={styles.close}
          type="button"
          aria-label="Закрыть подробную информацию"
          onClick={onClose}
        >
          ×
        </button>
        <span className={styles.eyebrow}>Первая тренировка · бесплатно</span>
        <h2 id={titleId}>{training.title}</h2>
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
        <div className={styles.notice} id={descriptionId}>
          Приезжайте за 15 минут до начала, чтобы успеть переодеться и вовремя выйти на корт.
        </div>
        <button className={styles.action} type="button" onClick={onClose}>
          Закрыть
        </button>
        <p className={styles.caption}>Запись и оплата не входят в демо-версию.</p>
      </section>
    </div>
  );
};

export default TrainingDetailsModal;
