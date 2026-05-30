import { useState } from 'react';
import { mockDashboard } from './data/mockDashboard';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import DoctorCard from './components/DoctorCard';
import StatCard from './components/StatCard';
import AppointmentList from './components/AppointmentList';
import LeadCard from './components/LeadCard';
import FinancialSummary from './components/FinancialSummary';
import SecurityBox from './components/SecurityBox';
import FeaturedRecord from './components/FeaturedRecord';
import LandingPage from './pages/LandingPage';
import styles from './App.module.css';

export default function App() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const data = mockDashboard;

  if (view === 'landing') {
    return <LandingPage onGoToDashboard={() => setView('dashboard')} />;
  }

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className={styles.mainArea}>
        <Topbar />

        <main className={styles.content}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '-1rem' }}>
             <button 
               onClick={() => setView('landing')} 
               style={{ background: 'transparent', color: '#0EA5E9', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}
             >
               ← Voltar para Landing Page
             </button>
          </div>
          {/* Doctor Institutional Card */}
          <DoctorCard doctor={data.doctor} />

          {/* Featured Record */}
          <FeaturedRecord record={data.featuredRecord} />

          {/* Metric Cards */}
          <section className={styles.statsGrid}>
            {data.stats.map((stat) => (
              <StatCard key={stat.id} stat={stat} />
            ))}
          </section>

          {/* Agenda + Leads */}
          <section className={styles.twoColumns}>
            <AppointmentList appointments={data.appointments} />
            <LeadCard leads={data.leads} />
          </section>

          {/* Financial Summary */}
          <FinancialSummary data={data.financial} />

          {/* Security & Compliance */}
          <SecurityBox features={data.security} />
        </main>

        <footer className={styles.footer}>
          © 2026 <span className={styles.footerAccent}>LC SmileCare Premium</span> — Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
}
