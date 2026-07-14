import { useMemo, useState } from 'react';
import styles from './App.module.css';
import { stations, trainings, type Station, type Training } from './data';

const scheduleDays = Array.from({ length: 7 }, (_, index) => {
  const date = new Date(2026, 6, 14 + index);

  return {
    value: date.toISOString().slice(0, 10),
    day: new Intl.DateTimeFormat('ru-RU', { day: '2-digit' }).format(date),
    weekday: new Intl.DateTimeFormat('ru-RU', { weekday: 'short' }).format(date).replace('.', ''),
  };
});

const formatDayHeading = (value: string) =>
  new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date(`${value}T12:00:00`));

function TrainingCard({ training, onSelect }: { training: Training; onSelect: () => void }) {
  const occupied = training.spotsTotal - training.spotsLeft;

  return (
    <article className={styles.card}>
      <div className={styles.cardTime}>
        <time dateTime={`${training.date}T${training.time}`}>{training.time}</time>
        <span>{training.duration} мин</span>
      </div>

      <div className={styles.cardMain}>
        <span className={styles.badge}>Бесплатно</span>
        <h3>{training.title}</h3>
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
        <div className={styles.spots} aria-label={`Свободно ${training.spotsLeft} из ${training.spotsTotal} мест`}>
          {Array.from({ length: training.spotsTotal }, (_, index) => (
            <span key={index} className={index < occupied ? styles.spotBusy : styles.spotFree} />
          ))}
        </div>
        <strong>{training.spotsLeft} места</strong>
        <span>свободно</span>
      </div>

      <button className={styles.detailsButton} type="button" onClick={onSelect}>
        Подробнее
        <span aria-hidden="true">↗</span>
      </button>
    </article>
  );
}

function DetailsModal({ training, onClose }: { training: Training; onClose: () => void }) {
  return (
    <div className={styles.modalBackdrop} role="presentation" onMouseDown={onClose}>
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="training-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className={styles.closeButton} type="button" aria-label="Закрыть" onClick={onClose}>
          ×
        </button>
        <span className={styles.modalEyebrow}>Первая тренировка · бесплатно</span>
        <h2 id="training-title">{training.title}</h2>
        <div className={styles.modalDate}>
          <strong>{formatDayHeading(training.date)}</strong>
          <span>
            {training.time} · {training.duration} минут
          </span>
        </div>
        <dl className={styles.detailsList}>
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
        <button className={styles.demoButton} type="button" onClick={onClose}>
          Закрыть
        </button>
        <p className={styles.demoCaption}>Запись и оплата не входят в демо-версию.</p>
      </section>
    </div>
  );
}

function App() {
  const [station, setStation] = useState<Station>('Все станции');
  const [selectedDate, setSelectedDate] = useState('all');
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);

  const visibleTrainings = useMemo(
    () =>
      trainings.filter(
        (training) =>
          (station === 'Все станции' || training.station === station) &&
          (selectedDate === 'all' || training.date === selectedDate),
      ),
    [selectedDate, station],
  );

  const groupedTrainings = useMemo(
    () =>
      Object.entries(
        visibleTrainings.reduce<Record<string, Training[]>>((groups, training) => {
          (groups[training.date] ??= []).push(training);
          return groups;
        }, {}),
      ),
    [visibleTrainings],
  );

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.logo} href="#top" aria-label="Падл хаб — на главную">
          <span>ПАДЛ</span>
          <i aria-hidden="true" />
          <span>хАБ</span>
        </a>
        <div className={styles.headerMeta}>
          <span>Москва</span>
          <span className={styles.statusDot} aria-hidden="true" />
          <span>Расписание обновлено</span>
        </div>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Падл хаб · Начни играть</p>
            <h1>
              <span className={styles.heroLine}>Первые</span>
              <span className={styles.heroLine}>пробные</span>
              <span className={`${styles.heroLine} ${styles.heroAccent}`}>тренировки</span>
            </h1>
          </div>
          <p className={styles.intro}>
            Познакомьтесь с паделом на бесплатной тренировке. Выберите удобную станцию и время —
            инвентарь уже ждёт на корте.
          </p>
        </section>

        <section className={styles.schedule} aria-labelledby="schedule-title">
          <div className={styles.scheduleHeading}>
            <div>
              <p className={styles.sectionNumber}>01 / Расписание</p>
              <h2 id="schedule-title">Ближайшие занятия</h2>
            </div>
            <label className={styles.stationSelect}>
              <span>Станция</span>
              <select value={station} onChange={(event) => setStation(event.target.value as Station)}>
                {stations.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.datePicker} aria-label="Фильтр по дате">
            <button
              className={selectedDate === 'all' ? styles.activeDate : undefined}
              type="button"
              onClick={() => setSelectedDate('all')}
            >
              <span>Все</span>
              <strong>7 дней</strong>
            </button>
            {scheduleDays.map((date) => (
              <button
                key={date.value}
                className={selectedDate === date.value ? styles.activeDate : undefined}
                type="button"
                onClick={() => setSelectedDate(date.value)}
              >
                <span>{date.weekday}</span>
                <strong>{date.day}</strong>
              </button>
            ))}
          </div>

          <div className={styles.scheduleBody} aria-live="polite">
            {groupedTrainings.length ? (
              groupedTrainings.map(([date, items]) => (
                <section className={styles.dayGroup} key={date}>
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
              <div className={styles.emptyState}>
                <span aria-hidden="true">○</span>
                <h2>На эту дату занятий нет</h2>
                <p>Попробуйте выбрать другую дату или показать все станции.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedDate('all');
                    setStation('Все станции');
                  }}
                >
                  Сбросить фильтры
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>Тестовое задание · Frontend demo</p>
        <p>React 19 · TypeScript · CSS Modules</p>
      </footer>

      {selectedTraining && (
        <DetailsModal training={selectedTraining} onClose={() => setSelectedTraining(null)} />
      )}
    </div>
  );
}

export default App;
