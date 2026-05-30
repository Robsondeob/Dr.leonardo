// ===================================
// LeadCard — Leads Quentes
// ===================================

import type { Lead } from '../types/dashboard';
import styles from './LeadCard.module.css';

interface LeadCardProps {
  leads: Lead[];
}

const TEMP_ICON: Record<Lead['temperature'], string> = {
  hot: '🔥',
  warm: '🌡️',
  cold: '❄️',
};

function LeadCard({ leads }: LeadCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.headerIcon} role="img" aria-hidden="true">🎯</span>
        <h2 className={styles.title}>Leads Quentes</h2>
      </div>

      {leads.length === 0 ? (
        <div className={styles.emptyState}>
          Nenhum lead disponível no momento.
        </div>
      ) : (
        <div className={styles.leadsList}>
          {leads.map((lead) => (
            <div key={lead.id} className={styles.leadItem}>
              <div className={styles.leadTop}>
                <span className={styles.leadName}>{lead.name}</span>
                <span
                  className={styles.tempIndicator}
                  role="img"
                  aria-label={`Temperatura: ${lead.temperature}`}
                >
                  {TEMP_ICON[lead.temperature]}
                </span>
              </div>

              <div className={styles.leadDetails}>
                <span className={styles.phone}>📞 {lead.phone}</span>
                <span className={styles.interest}>{lead.interest}</span>
                <span className={styles.sourceTag}>{lead.source}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <button className={styles.footerLink} type="button">
          Ver todos os leads →
        </button>
      </div>
    </div>
  );
}

export default LeadCard;
