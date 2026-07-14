import { useTheme } from '../../model/useTheme';
import styles from './ThemeToggle.module.css';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const nextThemeLabel = isDark ? 'светлую' : 'тёмную';

  return (
    <button
      className={styles.toggle}
      type="button"
      aria-label={`Включить ${nextThemeLabel} тему`}
      aria-pressed={isDark}
      title={`Включить ${nextThemeLabel} тему`}
      onClick={toggleTheme}
    >
      <span className={styles.icon} aria-hidden="true">
        {isDark ? '☾' : '☀'}
      </span>
      <span className={styles.label}>{isDark ? 'Тёмная' : 'Светлая'}</span>
    </button>
  );
};

export default ThemeToggle;
