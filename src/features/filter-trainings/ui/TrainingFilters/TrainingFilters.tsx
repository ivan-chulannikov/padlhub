import type { StationFilter, TrainingTypeFilter } from '@/entities/training';
import { Select } from '@/shared/ui/Select';
import { scheduleDays } from '../../model/scheduleDays';
import styles from './TrainingFilters.module.css';

type TrainingFiltersProps = {
  station: StationFilter;
  stations: StationFilter[];
  trainingType: TrainingTypeFilter;
  trainingTypes: TrainingTypeFilter[];
  selectedDate: string;
  onStationChange: (station: StationFilter) => void;
  onTrainingTypeChange: (trainingType: TrainingTypeFilter) => void;
  onDateChange: (date: string) => void;
};

const TrainingFilters = ({
  station,
  stations,
  trainingType,
  trainingTypes,
  selectedDate,
  onStationChange,
  onTrainingTypeChange,
  onDateChange,
}: TrainingFiltersProps) => (
  <div className={styles.filters}>
    <div className={styles.selectField}>
      <span>Тип</span>
      <Select
        ariaLabel="Тип игры"
        value={trainingType}
        options={trainingTypes}
        disabled={trainingTypes.length === 1}
        onChange={onTrainingTypeChange}
      />
    </div>

    <div className={styles.selectField}>
      <span>Станция</span>
      <Select
        ariaLabel="Станция"
        value={station}
        options={stations}
        disabled={stations.length === 1}
        onChange={onStationChange}
      />
    </div>

    <div className={styles.dates} aria-label="Фильтр по дате">
      <button
        className={selectedDate === 'all' ? styles.active : undefined}
        type="button"
        onClick={() => onDateChange('all')}
      >
        <span>Все</span>
        <strong>7 дней</strong>
      </button>
      {scheduleDays.map((date) => (
        <button
          key={date.value}
          className={selectedDate === date.value ? styles.active : undefined}
          type="button"
          onClick={() => onDateChange(date.value)}
        >
          <span>{date.weekday}</span>
          <strong>{date.day}</strong>
        </button>
      ))}
    </div>
  </div>
);

export default TrainingFilters;
