import type { SecurityFeature } from '../types/dashboard';
import styles from './SecurityBox.module.css';

interface SecurityBoxProps {
  features: SecurityFeature[];
}

export default function SecurityBox({ features }: SecurityBoxProps) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <span className={styles.headerIcon}>🛡️</span>
        <h2 className={styles.headerTitle}>Segurança & Conformidade</h2>
      </div>
      <div className={styles.grid}>
        {features.map((feature) => (
          <div key={feature.id} className={styles.feature}>
            <span className={styles.featureIcon}>{feature.icon}</span>
            <div className={styles.featureContent}>
              <span className={styles.featureLabel}>{feature.label}</span>
              <span className={styles.featureDescription}>{feature.description}</span>
            </div>
            {feature.active && <span className={styles.statusDot} />}
          </div>
        ))}
      </div>
    </section>
  );
}
