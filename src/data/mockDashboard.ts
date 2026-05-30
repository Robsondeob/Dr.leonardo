// ===================================
// LC SmileCare Premium — Mock Dashboard Data
// ===================================

import type { DashboardData } from '../types/dashboard';

export const mockDashboard: DashboardData = {
  doctor: {
    name: 'Dr. Leonardo César',
    title: 'Cirurgião-Dentista',
    cro: 'CRO-MG 24068',
    specialties: ['Dentística', 'Ortodontia', 'Ortopedia Facial'],
    slogan: 'O poder de sorrir sem limites!',
  },

  stats: [
    {
      id: 'stat-1',
      label: 'Consultas Hoje',
      value: 12,
      change: '+8%',
      changeType: 'positive',
      icon: '🦷',
    },
    {
      id: 'stat-2',
      label: 'Novos Leads',
      value: 24,
      change: '+15%',
      changeType: 'positive',
      icon: '🎯',
    },
    {
      id: 'stat-3',
      label: 'Planos Ativos',
      value: 187,
      change: '+3%',
      changeType: 'positive',
      icon: '📋',
    },
    {
      id: 'stat-4',
      label: 'Recebido no Mês',
      value: 'R$ 84.320',
      change: '+12%',
      changeType: 'positive',
      icon: '💰',
    },
  ],

  appointments: [
    {
      id: 'apt-1',
      patientName: 'Maria Silva',
      time: '08:00',
      procedure: 'Limpeza e Profilaxia',
      status: 'completed',
    },
    {
      id: 'apt-2',
      patientName: 'João Santos',
      time: '09:30',
      procedure: 'Restauração em Resina',
      status: 'in-progress',
    },
    {
      id: 'apt-3',
      patientName: 'Ana Oliveira',
      time: '11:00',
      procedure: 'Manutenção Ortodôntica',
      status: 'confirmed',
    },
    {
      id: 'apt-4',
      patientName: 'Carlos Mendes',
      time: '14:00',
      procedure: 'Avaliação Inicial',
      status: 'confirmed',
    },
    {
      id: 'apt-5',
      patientName: 'Beatriz Almeida',
      time: '15:30',
      procedure: 'Clareamento Dental',
      status: 'pending',
    },
    {
      id: 'apt-6',
      patientName: 'Ricardo Ferreira',
      time: '17:00',
      procedure: 'Extração Siso',
      status: 'pending',
    },
  ],

  leads: [
    {
      id: 'lead-1',
      name: 'Fernanda Costa',
      phone: '(31) 99876-5432',
      interest: 'Clareamento Dental',
      source: 'Instagram',
      temperature: 'hot',
      createdAt: '2 horas atrás',
    },
    {
      id: 'lead-2',
      name: 'Paulo Ribeiro',
      phone: '(31) 98765-4321',
      interest: 'Ortodontia',
      source: 'Google Ads',
      temperature: 'hot',
      createdAt: '4 horas atrás',
    },
    {
      id: 'lead-3',
      name: 'Luciana Martins',
      phone: '(31) 97654-3210',
      interest: 'Implante Dentário',
      source: 'Indicação',
      temperature: 'warm',
      createdAt: '1 dia atrás',
    },
    {
      id: 'lead-4',
      name: 'Roberto Nunes',
      phone: '(31) 96543-2109',
      interest: 'Lentes de Contato',
      source: 'Facebook',
      temperature: 'warm',
      createdAt: '2 dias atrás',
    },
  ],

  financial: {
    totalReceived: 84320,
    totalPending: 23450,
    totalExpenses: 18760,
    netProfit: 65560,
    entries: [
      { id: 'fin-1', label: 'Restauração — Maria Silva', value: 850, type: 'income' },
      { id: 'fin-2', label: 'Material Ortodôntico', value: 1200, type: 'expense' },
      { id: 'fin-3', label: 'Clareamento — João Santos', value: 1500, type: 'income' },
      { id: 'fin-4', label: 'Plano — Ana Oliveira (parcela)', value: 620, type: 'pending' },
      { id: 'fin-5', label: 'Implante — Carlos Mendes', value: 4200, type: 'income' },
    ],
  },

  security: [
    {
      id: 'sec-1',
      label: 'RBAC',
      description: 'Controle de acesso baseado em papéis',
      icon: '🔐',
      active: true,
    },
    {
      id: 'sec-2',
      label: '2FA',
      description: 'Autenticação em dois fatores ativa',
      icon: '🛡️',
      active: true,
    },
    {
      id: 'sec-3',
      label: 'LGPD',
      description: 'Em conformidade com a Lei Geral de Proteção de Dados',
      icon: '📜',
      active: true,
    },
    {
      id: 'sec-4',
      label: 'Criptografia',
      description: 'Dados criptografados em trânsito e em repouso (AES-256)',
      icon: '🔒',
      active: true,
    },
    {
      id: 'sec-5',
      label: 'Auditoria',
      description: 'Log completo de ações e acessos ao sistema',
      icon: '📊',
      active: true,
    },
  ],

  featuredRecord: {
    id: 'rec-1',
    patientNameMasked: 'L*** M***',
    type: 'Reabilitação Oral',
    status: 'active',
    lastEvolution: 'Paciente relatou melhora na sensibilidade após aplicação de flúor. Próxima sessão: preparo para coroa total.',
    treatmentPlan: 'Plano Ouro - 12 sessões',
  },
};
