// ===================================
// FinancialSummary — Resumo Financeiro
// ===================================

import type { FinancialSummaryData, FinancialEntry } from '../types/dashboard';
import styles from './FinancialSummary.module.css';

interface FinancialSummaryProps {
  data: FinancialSummaryData;
}

/**
 * Formats a number as BRL currency: R$ 12.345,67
 */
function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

const DOT_CLASS: Record<FinancialEntry['type'], string> = {
  income: styles.dotIncome,
  expense: styles.dotExpense,
  pending: styles.dotPending,
};

const VALUE_CLASS: Record<FinancialEntry['type'], string> = {
  income: styles.valueIncome,
  expense: styles.valueExpense,
  pending: styles.valuePending,
};

const VALUE_PREFIX: Record<FinancialEntry['type'], string> = {
  income: '+ ',
  expense: '- ',
  pending: '',
};

function FinancialSummary({ data }: FinancialSummaryProps) {
  const { totalReceived, totalPending, totalExpenses, netProfit, entries } = data;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.headerIcon} role="img" aria-hidden="true">💰</span>
        <h2 className={styles.title}>Resumo Financeiro</h2>
      </div>

      {/* Mini stat boxes */}
      <div className={styles.statsGrid}>
        <div className={styles.miniStat}>
          <span className={styles.miniStatLabel}>Recebido</span>
          <span className={`${styles.miniStatValue} ${styles.green}`}>
            {formatBRL(totalReceived)}
          </span>
        </div>

        <div className={styles.miniStat}>
          <span className={styles.miniStatLabel}>Pendente</span>
          <span className={`${styles.miniStatValue} ${styles.yellow}`}>
            {formatBRL(totalPending)}
          </span>
        </div>

        <div className={styles.miniStat}>
          <span className={styles.miniStatLabel}>Despesas</span>
          <span className={`${styles.miniStatValue} ${styles.red}`}>
            {formatBRL(totalExpenses)}
          </span>
        </div>

        <div className={styles.miniStat}>
          <span className={styles.miniStatLabel}>Lucro Líquido</span>
          <span className={`${styles.miniStatValue} ${styles.cyan}`}>
            {formatBRL(netProfit)}
          </span>
        </div>
      </div>

      {/* Recent entries */}
      <div className={styles.entriesSection}>
        <div className={styles.entriesDivider} />
        <span className={styles.entriesTitle}>Lançamentos Recentes</span>

        {entries.length === 0 ? (
          <div className={styles.emptyEntries}>
            Nenhum lançamento recente.
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className={styles.entryRow}>
              <span className={`${styles.entryDot} ${DOT_CLASS[entry.type]}`} />
              <span className={styles.entryLabel}>{entry.label}</span>
              <span className={`${styles.entryValue} ${VALUE_CLASS[entry.type]}`}>
                {VALUE_PREFIX[entry.type]}{formatBRL(Math.abs(entry.value))}
              </span>
            </div>
          ))
        )}
      </div>

      <div className={styles.footer}>
        <button className={styles.footerLink} type="button">
          Ver relatório completo →
        </button>
      </div>
    </div>
  );
}

export default FinancialSummary;
