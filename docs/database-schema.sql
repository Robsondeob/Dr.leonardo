-- ==============================================================================
-- LC SmileCare Premium - PostgreSQL Database Schema
-- Multi-tenant SaaS architecture using UUIDs.
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tenants (Clinics)
CREATE TABLE clinics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Users (System Access)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL, -- e.g., 'ADMIN', 'DENTIST', 'RECEPTIONIST'
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Professionals (Dentists details linked to Users)
CREATE TABLE professionals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    cro_number VARCHAR(50) NOT NULL,
    specialties TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Patients Identity (PII Data - Some fields should be encrypted at application level)
CREATE TABLE patients_identity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE, -- Consider application-level encryption for CPF
    birth_date DATE,
    phone VARCHAR(20),
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Patients Clinical Profile (Sensitive Health Data - High Encryption Requirement)
CREATE TABLE patients_clinical_profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL UNIQUE REFERENCES patients_identity(id) ON DELETE CASCADE,
    anamnesis_data JSONB, -- Encrypt JSON payload in application layer
    allergies TEXT, -- Encrypt
    current_medications TEXT, -- Encrypt
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Leads (CRM)
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    interest_area VARCHAR(100),
    source VARCHAR(100),
    temperature VARCHAR(20), -- 'hot', 'warm', 'cold'
    status VARCHAR(50) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Appointments (Agenda)
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES professionals(id),
    patient_id UUID REFERENCES patients_identity(id), -- Nullable for leads not yet patients
    lead_id UUID REFERENCES leads(id),
    scheduled_start TIMESTAMP WITH TIME ZONE NOT NULL,
    scheduled_end TIMESTAMP WITH TIME ZONE NOT NULL,
    procedure_name VARCHAR(255),
    status VARCHAR(50) NOT NULL, -- 'confirmed', 'pending', 'in-progress', 'completed', 'cancelled'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Medical Records (Prontuário Root)
CREATE TABLE medical_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES patients_identity(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Clinical Notes (Evoluções)
CREATE TABLE clinical_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medical_record_id UUID NOT NULL REFERENCES medical_records(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES professionals(id),
    appointment_id UUID REFERENCES appointments(id),
    content TEXT NOT NULL, -- Highly sensitive, encrypt at application level
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Odontogram Entries (Graphical Dental Chart)
CREATE TABLE odontogram_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medical_record_id UUID NOT NULL REFERENCES medical_records(id) ON DELETE CASCADE,
    tooth_number INTEGER NOT NULL,
    surface VARCHAR(20), -- 'mesial', 'distal', 'occlusal', etc.
    condition VARCHAR(100) NOT NULL, -- 'caries', 'restoration_resin', 'missing', etc.
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Treatment Plans
CREATE TABLE treatment_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medical_record_id UUID NOT NULL REFERENCES medical_records(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES professionals(id),
    title VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'proposed', -- 'proposed', 'approved', 'rejected', 'completed'
    total_value DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Treatment Plan Items
CREATE TABLE treatment_plan_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    treatment_plan_id UUID NOT NULL REFERENCES treatment_plans(id) ON DELETE CASCADE,
    tooth_number INTEGER,
    procedure_name VARCHAR(255) NOT NULL,
    value DECIMAL(12, 2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'done'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Transactions (Financial)
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinic_id UUID NOT NULL REFERENCES clinics(id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients_identity(id),
    treatment_plan_id UUID REFERENCES treatment_plans(id),
    amount DECIMAL(12, 2) NOT NULL,
    type VARCHAR(20) NOT NULL, -- 'income', 'expense'
    status VARCHAR(20) NOT NULL, -- 'paid', 'pending', 'cancelled'
    due_date DATE,
    paid_at TIMESTAMP WITH TIME ZONE,
    description VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. Payment Splits (Comissionamento)
CREATE TABLE payment_splits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID NOT NULL REFERENCES transactions(id) ON DELETE CASCADE,
    professional_id UUID NOT NULL REFERENCES professionals(id),
    amount DECIMAL(12, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 15. Clinical Documents (Files, X-Rays, PDFs)
CREATE TABLE clinical_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    medical_record_id UUID NOT NULL REFERENCES medical_records(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL, -- 'x-ray', 'prescription', 'certificate'
    file_url VARCHAR(1024) NOT NULL, -- S3 URL
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 16. LGPD Consents
CREATE TABLE lgpd_consents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID NOT NULL REFERENCES patients_identity(id) ON DELETE CASCADE,
    document_version VARCHAR(50) NOT NULL,
    consent_given BOOLEAN NOT NULL,
    ip_address VARCHAR(45),
    agreed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 17. Audit Logs (Immutable)
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinic_id UUID NOT NULL REFERENCES clinics(id),
    user_id UUID REFERENCES users(id), -- Can be null for system actions
    entity_type VARCHAR(100) NOT NULL, -- 'medical_records', 'patients_identity', etc.
    entity_id UUID NOT NULL,
    action VARCHAR(50) NOT NULL, -- 'CREATE', 'UPDATE', 'DELETE', 'VIEW'
    old_data JSONB,
    new_data JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_appointments_clinic_date ON appointments(clinic_id, scheduled_start);
CREATE INDEX idx_transactions_clinic_status ON transactions(clinic_id, status);
CREATE INDEX idx_medical_records_patient ON medical_records(patient_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
