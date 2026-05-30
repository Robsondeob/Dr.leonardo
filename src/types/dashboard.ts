// ===================================
// LC SmileCare Premium — Dashboard Types
// ===================================

export interface StatMetric {
  id: string;
  label: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  time: string;
  procedure: string;
  status: 'confirmed' | 'pending' | 'in-progress' | 'completed' | 'cancelled';
  avatar?: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  interest: string;
  source: string;
  temperature: 'hot' | 'warm' | 'cold';
  createdAt: string;
}

export interface FinancialEntry {
  id: string;
  label: string;
  value: number;
  type: 'income' | 'expense' | 'pending';
}

export interface FinancialSummaryData {
  totalReceived: number;
  totalPending: number;
  totalExpenses: number;
  netProfit: number;
  entries: FinancialEntry[];
}

export interface SecurityFeature {
  id: string;
  label: string;
  description: string;
  icon: string;
  active: boolean;
}

export interface DoctorProfile {
  name: string;
  title: string;
  cro: string;
  specialties: string[];
  slogan: string;
}

export interface MedicalRecord {
  id: string;
  patientNameMasked: string;
  type: string;
  status: 'active' | 'archived' | 'pending-review';
  lastEvolution: string;
  treatmentPlan: string;
}

export interface DashboardData {
  doctor: DoctorProfile;
  stats: StatMetric[];
  appointments: Appointment[];
  leads: Lead[];
  financial: FinancialSummaryData;
  security: SecurityFeature[];
  featuredRecord: MedicalRecord;
}
