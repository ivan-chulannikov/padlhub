import type { ReactNode } from 'react';
import styles from './StatePanel.module.css';

type StatePanelProps = {
  variant: 'loading' | 'error' | 'empty';
  title: string;
  description: string;
  action?: ReactNode;
};

const StatePanel = ({ variant, title, description, action }: StatePanelProps) => (
  <div className={styles.panel} role={variant === 'error' ? 'alert' : 'status'}>
    {variant === 'loading' ? (
      <span className={styles.loader} aria-hidden="true" />
    ) : (
      <span className={styles.icon} aria-hidden="true">
        {variant === 'error' ? '!' : '○'}
      </span>
    )}
    <h2>{title}</h2>
    <p>{description}</p>
    {action}
  </div>
);

export default StatePanel;
