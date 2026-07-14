import { ThemeToggle } from '@/features/theme-toggle';
import { TrainingSchedule } from '@/widgets/training-schedule';
import styles from './SchedulePage.module.css';

const SchedulePage = () => (
  <div className={styles.page}>
    <a className={styles.skipLink} href="#main-content">
      Перейти к расписанию
    </a>
    <header className={styles.header}>
      <a className={styles.logo} href="/" aria-label="Падл хаб — на главную">
        <span>ПАДЛ</span>
        <i aria-hidden="true" />
        <span>хАБ</span>
      </a>
      <div className={styles.headerActions}>
        <div className={styles.meta}>
          <span>Москва</span>
          <span className={styles.status} aria-hidden="true" />
          <span>Расписание обновлено</span>
        </div>
        <ThemeToggle />
      </div>
    </header>

    <main id="main-content" tabIndex={-1}>
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
