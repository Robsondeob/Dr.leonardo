import type { MedicalRecord } from '../types/dashboard';
import styles from './FeaturedRecord.module.css';

interface FeaturedRecordProps {
  record: MedicalRecord;
}

const STATUS_LABELS: Record<MedicalRecord['status'], string> = {
  active: 'Ativo',
  archived: 'Arquivado',
  'pending-review': 'Revisão Pendente',
};

const STATUS_CLASSES: Record<MedicalRecord['status'], string> = {
  active: styles.statusActive,
  archived: styles.statusArchived,
  'pending-review': styles.statusPending,
};

export default function FeaturedRecord({ record }: FeaturedRecordProps) {
  return (
    <section className={styles.card}>
      <div className={styles.header}>
        <div className={styles.titleArea}>
          <span className={styles.icon} role="img" aria-hidden="true">📋</span>
          <h2 className={styles.title}>Prontuário em Destaque</h2>
        </div>
        <span className={`${styles.status} ${STATUS_CLASSES[record.status]}`}>
          {STATUS_LABELS[record.status]}
        </span>
      </div>

      <div className={styles.content}>
        <div className={styles.row}>
          <span className={styles.label}>Paciente</span>
          <span className={styles.patientName}>{record.patientNameMasked}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Tipo de Atendimento</span>
          <span className={styles.value}>{record.type}</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Última Evolução Clínica</span>
          <span className={styles.value}>"{record.lastEvolution}"</span>
        </div>

        <div className={styles.row}>
          <span className={styles.label}>Plano de Tratamento</span>
          <span className={styles.value}>{record.treatmentPlan}</span>
        </div>
      </div>

      <div className={styles.actionArea}>
        <button className={styles.btn} type="button">
          Abrir prontuário →
        </button>
      </div>
    </section>
  );
}
