import { useEffect, useMemo, useState } from 'react';
import {
  getStations,
  getTrainings,
  TrainingCard,
  TrainingDetailsModal,
  type StationFilter,
  type Training,
} from '@/entities/training';
import { TrainingFilters } from '@/features/filter-trainings';
import { formatDayHeading } from '@/shared/lib/date';
import { StatePanel } from '@/shared/ui/StatePanel';
import styles from './TrainingSchedule.module.css';

const TrainingSchedule = () => {
  const [station, setStation] = useState<StationFilter>('Все станции');
  const [selectedDate, setSelectedDate] = useState('all');
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);
  const [stations, setStations] = useState<StationFilter[]>(['Все станции']);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    getStations(controller.signal)
      .then((items) => setStations(['Все станции', ...items]))
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
        setError('Не удалось загрузить список станций.');
      });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    getTrainings(
      {
        station: station === 'Все станции' ? undefined : station,
        date: selectedDate === 'all' ? undefined : selectedDate,
      },
      controller.signal,
    )
      .then(setTrainings)
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === 'AbortError') return;
        setError('Не удалось загрузить расписание. Проверьте подключение к API.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [requestVersion, selectedDate, station]);

  const groupedTrainings = useMemo(
    () =>
      Object.entries(
        trainings.reduce<Record<string, Training[]>>((groups, training) => {
          (groups[training.date] ??= []).push(training);
          return groups;
        }, {}),
      ),
    [trainings],
  );

  const resetFilters = () => {
    setSelectedDate('all');
    setStation('Все станции');
  };

  return (
    <section className={styles.schedule} aria-labelledby="schedule-title">
      <div className={styles.controls}>
        <div>
          <p className={styles.number}>01 / Расписание</p>
          <h2 id="schedule-title">Ближайшие занятия</h2>
        </div>
        <TrainingFilters
          station={station}
          stations={stations}
          selectedDate={selectedDate}
          onStationChange={setStation}
          onDateChange={setSelectedDate}
        />
      </div>

      <div className={styles.body} aria-live="polite">
        {isLoading ? (
          <StatePanel
            variant="loading"
            title="Загружаем расписание"
            description="Получаем ближайшие тренировки из API."
          />
        ) : error ? (
          <StatePanel
            variant="error"
            title="Расписание временно недоступно"
            description={error}
            action={
              <button type="button" onClick={() => setRequestVersion((version) => version + 1)}>
                Повторить
              </button>
            }
          />
        ) : groupedTrainings.length ? (
          groupedTrainings.map(([date, items]) => (
            <section className={styles.day} key={date}>
              <div className={styles.dayHeading}>
                <h2>{formatDayHeading(date)}</h2>
                <span>
                  {items.length} {items.length === 1 ? 'тренировка' : 'тренировки'}
                </span>
              </div>
              <div className={styles.cards}>
                {items.map((training) => (
                  <TrainingCard
                    key={training.id}
                    training={training}
                    onSelect={() => setSelectedTraining(training)}
                  />
                ))}
              </div>
            </section>
          ))
        ) : (
          <StatePanel
            variant="empty"
            title="На эту дату занятий нет"
            description="Попробуйте выбрать другую дату или показать все станции."
            action={
              <button type="button" onClick={resetFilters}>
                Сбросить фильтры
              </button>
            }
          />
        )}
      </div>

      {selectedTraining && (
        <TrainingDetailsModal
          training={selectedTraining}
          onClose={() => setSelectedTraining(null)}
        />
      )}
    </section>
  );
};

export default TrainingSchedule;
