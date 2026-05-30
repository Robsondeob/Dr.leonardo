import { useState } from 'react';
import styles from './LandingPage.module.css';

interface LandingPageProps {
  onGoToDashboard: () => void;
}

export default function LandingPage({ onGoToDashboard }: LandingPageProps) {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    interest: '',
    time: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    // Simulate network request
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.landingContainer}>
      {/* Navigation */}
      <nav className={styles.navBar}>
        <div className={styles.brand}>
          <img src="/logo.png" alt="LC SmileCare Logo" className={styles.logoImage} />
        </div>
        <button onClick={onGoToDashboard} className={styles.navLink}>
          Área do Profissional →
        </button>
      </nav>

      {/* 1. Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.heroName}>Dr. Leonardo César</h1>
        <h2 className={styles.heroSubtitle}>Cirurgião-Dentista | CRO-MG 24068</h2>
        <p className={styles.heroSlogan}>"O poder de sorrir sem limites!"</p>
        
        <div className={styles.heroSpecialties}>
          <span className={styles.specialtyBadge}>Dentística</span>
          <span className={styles.specialtyBadge}>Ortodontia</span>
          <span className={styles.specialtyBadge}>Ortopedia Facial</span>
        </div>

        <div className={styles.heroActions}>
          <button className={`${styles.primaryBtn} ${styles.pulseBtn}`} onClick={() => document.getElementById('triagem')?.scrollIntoView({ behavior: 'smooth' })}>
            Agendar avaliação
          </button>
          <button className={styles.secondaryBtn}>
            Falar no WhatsApp
          </button>
        </div>
      </section>

      {/* 2. Benefits Section */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Por que escolher a <span>SmileCare</span>?</h2>
        <div className={styles.benefitsGrid}>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>🎯</div>
            <h3 className={styles.benefitTitle}>Planejamento Personalizado</h3>
            <p style={{ color: '#94A3B8', marginTop: '0.5rem', fontSize: '0.9rem' }}>Cada sorriso é único. Desenhamos o tratamento ideal para sua necessidade específica.</p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>🤝</div>
            <h3 className={styles.benefitTitle}>Atendimento Humanizado</h3>
            <p style={{ color: '#94A3B8', marginTop: '0.5rem', fontSize: '0.9rem' }}>Seu conforto e bem-estar são nossas maiores prioridades do início ao fim.</p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>✨</div>
            <h3 className={styles.benefitTitle}>Ortodontia & Estética</h3>
            <p style={{ color: '#94A3B8', marginTop: '0.5rem', fontSize: '0.9rem' }}>As técnicas mais avançadas para alinhar e harmonizar o seu sorriso.</p>
          </div>
          <div className={styles.benefitCard}>
            <div className={styles.benefitIcon}>🔒</div>
            <h3 className={styles.benefitTitle}>Tecnologia & Segurança</h3>
            <p style={{ color: '#94A3B8', marginTop: '0.5rem', fontSize: '0.9rem' }}>Equipamentos de ponta e proteção total dos seus dados clínicos.</p>
          </div>
        </div>
      </section>

      {/* 3. Triage Form */}
      <section id="triagem" className={`${styles.section} ${styles.formSection}`}>
        <h2 className={styles.sectionTitle}>Triagem <span>Rápida</span></h2>
        
        <div className={styles.formContainer}>
          {formStatus === 'success' ? (
            <div className={styles.successMessage}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h3>Triagem enviada com sucesso!</h3>
              <p style={{ marginTop: '0.5rem', fontWeight: 400 }}>Nossa equipe entrará em contato pelo WhatsApp em breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>Nome Completo</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  className={styles.formInput} 
                  placeholder="Seu nome"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="whatsapp" className={styles.formLabel}>WhatsApp</label>
                <input 
                  type="tel" 
                  id="whatsapp" 
                  name="whatsapp" 
                  required
                  className={styles.formInput} 
                  placeholder="(00) 00000-0000"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="interest" className={styles.formLabel}>Interesse Clínico</label>
                <select 
                  id="interest" 
                  name="interest" 
                  required
                  className={styles.formSelect}
                  value={formData.interest}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="ortodontia">Ortodontia (Aparelhos)</option>
                  <option value="estetica">Estética (Clareamento, Lentes)</option>
                  <option value="clinico">Clínico Geral (Limpeza, Restauração)</option>
                  <option value="dor">Dor / Urgência</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="time" className={styles.formLabel}>Melhor Horário para Contato</label>
                <select 
                  id="time" 
                  name="time" 
                  required
                  className={styles.formSelect}
                  value={formData.time}
                  onChange={handleInputChange}
                >
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="manha">Manhã (08:00 - 12:00)</option>
                  <option value="tarde">Tarde (13:00 - 18:00)</option>
                  <option value="noite">Noite (18:00 - 20:00)</option>
                </select>
              </div>

              <button 
                type="submit" 
                className={`${styles.primaryBtn} ${styles.submitBtn}`}
                disabled={formStatus === 'submitting'}
              >
                {formStatus === 'submitting' ? 'Enviando...' : 'Enviar triagem'}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 4. Institutional Section */}
      <section className={styles.section}>
        <div className={styles.institutional}>
          <div className={styles.instAvatar}>LC</div>
          <h2 className={styles.sectionTitle} style={{ marginBottom: '1rem' }}>Conheça o Profissional</h2>
          <p style={{ color: '#0EA5E9', fontWeight: 600, marginBottom: '2rem' }}>CRO-MG 24068</p>
          
          <p className={styles.instText}>
            Com vasta experiência em <strong>Dentística, Ortodontia e Ortopedia Facial</strong>, 
            o Dr. Leonardo César tem como missão transformar vidas através do sorriso. 
            Aliando conhecimento técnico e sensibilidade artística, cada tratamento é executado 
            com o mais alto padrão de excelência, focado sempre no bem-estar e na saúde integral do paciente.
          </p>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className={`${styles.section} ${styles.ctaSection}`}>
        <h2 className={styles.ctaTitle}>Comece hoje sua transformação de sorriso</h2>
        <button 
          className={styles.primaryBtn} 
          style={{ padding: '1.25rem 2.5rem', fontSize: '1.2rem' }}
          onClick={() => document.getElementById('triagem')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Quero agendar minha avaliação
        </button>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        © 2026 LC SmileCare Premium — Dr. Leonardo César. Todos os direitos reservados.
      </footer>
    </div>
  );
}
