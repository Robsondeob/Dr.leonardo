// ===================================
// StatCard — Dashboard Metric Card
// ===================================

import type { StatMetric } from '../types/dashboard';
import styles from './StatCard.module.css';

interface StatCardProps {
  stat: StatMetric;
}

function StatCard({ stat }: StatCardProps) {
  const { icon, value, label, change, changeType } = stat;

  const changeClass = changeType === 'positive'
    ? styles.positive
    : changeType === 'negative'
      ? styles.negative
      : styles.neutral;

  const arrow = changeType === 'positive'
    ? '▲'
    : changeType === 'negative'
      ? '▼'
      : '●';

  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <span role="img" aria-hidden="true">{icon}</span>
      </div>

      <div className={styles.content}>
        <span className={styles.value}>{value}</span>
        <span className={styles.label}>{label}</span>

        {change && (
          <div className={styles.changeRow}>
            <span className={`${styles.changeIndicator} ${changeClass}`}>
              <span className={styles.arrow}>{arrow}</span>
              {change}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;
