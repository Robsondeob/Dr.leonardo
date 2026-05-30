import type { DoctorProfile } from '../types/dashboard';
import styles from './DoctorCard.module.css';

interface DoctorCardProps {
  doctor: DoctorProfile;
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <section className={styles.card}>
      <div className={styles.avatar}>LC</div>
      <div className={styles.info}>
        <h1 className={styles.name}>{doctor.name}</h1>
        <span className={styles.title}>
          {doctor.title} | {doctor.cro}
        </span>
        <div className={styles.specialties}>
          {doctor.specialties.map((spec) => (
            <span key={spec} className={styles.tag}>
              {spec}
            </span>
          ))}
        </div>
        <p className={styles.slogan}>"{doctor.slogan}"</p>
      </div>
    </section>
  );
}
