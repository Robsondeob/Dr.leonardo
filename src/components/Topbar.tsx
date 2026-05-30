import { type FC, useMemo } from 'react';
import styles from './Topbar.module.css';

interface TopbarProps {
  notificationCount?: number;
  onNewAppointment?: () => void;
  onNotificationClick?: () => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

const Topbar: FC<TopbarProps> = ({
  notificationCount = 3,
  onNewAppointment,
  onNotificationClick,
  searchValue = '',
  onSearchChange,
}) => {
  const currentDate = useMemo(() => {
    return new Date().toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, []);

  // Capitalize first letter (pt-BR weekdays come lowercase)
  const formattedDate = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);

  return (
    <header className={styles.topbar}>
      {/* Left – greeting & date */}
      <div className={styles.greeting}>
        <span className={styles.greetingText}>Bem-vindo, Dr. Leonardo</span>
        <span className={styles.greetingDate}>{formattedDate}</span>
      </div>

      {/* Center – search */}
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon} aria-hidden="true">
          🔍
        </span>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Buscar paciente, procedimento..."
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          aria-label="Buscar paciente ou procedimento"
        />
      </div>

      {/* Right – actions */}
      <div className={styles.actions}>
        {/* Notification bell */}
        <button
          type="button"
          className={styles.notificationBtn}
          onClick={onNotificationClick}
          aria-label={`Notificações: ${notificationCount} novas`}
        >
          🔔
          {notificationCount > 0 && (
            <span className={styles.badge}>{notificationCount}</span>
          )}
        </button>

        {/* New appointment CTA */}
        <button
          type="button"
          className={styles.newAppointmentBtn}
          onClick={onNewAppointment}
        >
          <span className={styles.plusIcon}>+</span>
          <span>Novo Agendamento</span>
        </button>
      </div>
    </header>
  );
};

export default Topbar;
