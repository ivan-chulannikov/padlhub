import { TrainingSchedule } from '@/widgets/training-schedule';
import styles from './SchedulePage.module.css';

const SchedulePage = () => (
  <div className={styles.page}>
    <header className={styles.header}>
      <a className={styles.logo} href="#top" aria-label="Падл хаб — на главную">
        <span>ПАДЛ</span>
        <i aria-hidden="true" />
        <span>хАБ</span>
      </a>
      <div className={styles.meta}>
        <span>Москва</span>
        <span className={styles.status} aria-hidden="true" />
        <span>Расписание обновлено</span>
      </div>
    </header>

    <main id="top">
      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>Падл хаб · Начни играть</p>
          <h1>
            <span>Первые</span>
            <span>пробные</span>
            <span className={styles.accent}>тренировки</span>
          </h1>
        </div>
        <p className={styles.intro}>
          Познакомьтесь с паделом на бесплатной тренировке. Выберите удобную станцию и время —
          инвентарь уже ждёт на корте.
        </p>
      </section>

      <TrainingSchedule />
    </main>

    <footer className={styles.footer}>
      <p>Тестовое задание · Fullstack demo</p>
      <p>React 19 · NestJS · MongoDB</p>
    </footer>
  </div>
);

export default SchedulePage;
