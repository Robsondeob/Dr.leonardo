import { type FC } from 'react';
import styles from './Sidebar.module.css';

interface NavItem {
  icon: string;
  label: string;
  id: string;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  activeItem?: string;
  onNavigate?: (id: string) => void;
}

const navItems: NavItem[] = [
  { icon: '📊', label: 'Dashboard', id: 'dashboard' },
  { icon: '📅', label: 'Agenda', id: 'agenda' },
  { icon: '👥', label: 'Pacientes', id: 'pacientes' },
  { icon: '💰', label: 'Financeiro', id: 'financeiro' },
  { icon: '🎯', label: 'Leads', id: 'leads' },
  { icon: '🦷', label: 'Tratamentos', id: 'tratamentos' },
  { icon: '📈', label: 'Relatórios', id: 'relatorios' },
  { icon: '⚙️', label: 'Configurações', id: 'configuracoes' },
];

const Sidebar: FC<SidebarProps> = ({
  isOpen,
  onToggle,
  activeItem = 'dashboard',
  onNavigate,
}) => {
  const handleNavClick = (id: string) => {
    onNavigate?.(id);
    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 768) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile hamburger toggle */}
      <button
        className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}
        onClick={onToggle}
        aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
        type="button"
      >
        <span className={styles.hamburgerBar} />
        <span className={styles.hamburgerBar} />
        <span className={styles.hamburgerBar} />
      </button>

      {/* Mobile overlay */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
        onClick={onToggle}
        aria-hidden="true"
      />

      {/* Sidebar panel */}
      <aside
        className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}
        role="navigation"
        aria-label="Menu principal"
      >
        {/* Brand / Logo */}
        <div className={styles.brand}>
          <img src="/logo.png" alt="LC SmileCare Logo" className={styles.logoImage} />
        </div>

        {/* Navigation items */}
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.navItem} ${
                activeItem === item.id ? styles.navItemActive : ''
              }`}
              onClick={() => handleNavClick(item.id)}
              aria-current={activeItem === item.id ? 'page' : undefined}
            >
              <span className={styles.navIcon} role="img" aria-hidden="true">
                {item.icon}
              </span>
              <span className={styles.navLabel}>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Doctor info footer */}
        <div className={styles.footer}>
          <div className={styles.footerAvatar}>LC</div>
          <div className={styles.footerInfo}>
            <span className={styles.footerName}>Dr. Leonardo César</span>
            <span className={styles.footerCro}>CRO-MG 24068</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
