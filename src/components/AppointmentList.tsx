// ===================================
// AppointmentList — Agenda do Dia
// ===================================

import type { Appointment } from '../types/dashboard';
import styles from './AppointmentList.module.css';

interface AppointmentListProps {
  appointments: Appointment[];
}

const STATUS_LABELS: Record<Appointment['status'], string> = {
  confirmed: 'Confirmado',
  pending: 'Pendente',
  'in-progress': 'Em Atendimento',
  completed: 'Concluído',
  cancelled: 'Cancelado',
};

const STATUS_CLASSES: Record<Appointment['status'], string> = {
  confirmed: styles.confirmed,
  pending: styles.pending,
  'in-progress': styles.inProgress,
  completed: styles.completed,
  cancelled: styles.cancelled,
};

function AppointmentList({ appointments }: AppointmentListProps) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.headerIcon} role="img" aria-hidden="true">📅</span>
        <h2 className={styles.title}>Agenda do Dia</h2>
      </div>

      {appointments.length === 0 ? (
        <div className={styles.emptyState}>
          Nenhum agendamento para hoje.
        </div>
      ) : (
        <div className={styles.list}>
          {appointments.map((appt) => (
            <div key={appt.id} className={styles.row}>
              <span className={styles.time}>{appt.time}</span>

              <div className={styles.patientInfo}>
                <span className={styles.patientName}>{appt.patientName}</span>
                <span className={styles.procedure}>{appt.procedure}</span>
              </div>

              <span className={`${styles.badge} ${STATUS_CLASSES[appt.status]}`}>
                {STATUS_LABELS[appt.status]}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className={styles.footer}>
        <button className={styles.footerLink} type="button">
          Ver agenda completa →
        </button>
      </div>
    </div>
  );
}

export default AppointmentList;
