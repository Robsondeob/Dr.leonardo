# Arquitetura SaaS - LC SmileCare Premium

A plataforma LC SmileCare Premium foi desenhada para ser um SaaS odontológico de alto desempenho, focado em segurança de dados sensíveis de saúde e usabilidade premium.

## 1. Visão Geral (Stack)

*   **Front-end:** Vite + React + TypeScript + CSS Modules (desacoplado, SPA).
*   **Back-end Futuro:** Arquitetura de microserviços ou monólito modular (ex: Node.js/NestJS ou Go), expondo uma API RESTful e/ou GraphQL.
*   **Banco de Dados:** PostgreSQL (Relacional, com suporte a JSONB para flexibilidade clínica).
*   **Armazenamento de Arquivos:** AWS S3 (ou equivalente) para imagens de raio-x, tomografias e documentos, com URLs pré-assinadas.

## 2. Segurança e LGPD

Dados de saúde são classificados como **dados pessoais sensíveis** pela LGPD (Lei Geral de Proteção de Dados - Lei nº 13.709/2018).

*   **Criptografia (Em Trânsito e Repouso):**
    *   Em trânsito: TLS 1.3 obrigatório para todas as comunicações.
    *   Em repouso: Encriptação no nível do disco de banco de dados (ex: AWS RDS KMS) e encriptação no nível de aplicação (AES-256) para campos altamente sensíveis (ex: histórico de doenças, anamnese).
*   **Gestão de Consentimento (LGPD):**
    *   Tabela dedicada para registrar quando o paciente aceitou os termos de uso e política de privacidade, incluindo versionamento dos documentos aceitos.
*   **Auditoria (Audit Trails):**
    *   Todas as ações de criação, leitura, atualização e exclusão (CRUD) em prontuários e dados financeiros devem gerar logs imutáveis (`audit_logs`), contendo o UUID do usuário, IP, timestamp e payload da alteração.

## 3. Controle de Acesso (RBAC & 2FA)

*   **RBAC (Role-Based Access Control):**
    *   Permissões granulares baseadas em papéis. Exemplo: `ADMIN` (acesso total), `DENTIST` (acesso a agendas e prontuários próprios), `RECEPTIONIST` (agenda e leads, sem acesso a prontuários detalhados).
*   **2FA (Autenticação em Dois Fatores):**
    *   Obrigatório para perfis clínicos e administrativos (via App Authenticator - TOTP ou SMS).

## 4. Banco de Dados e Multi-Tenancy

*   O SaaS operará com um modelo **Single Database, Logical Isolation (Multi-tenant)**.
*   Todas as tabelas principais possuirão uma coluna `clinic_id` (Row-Level Security no PostgreSQL será implementado para garantir que uma clínica nunca acesse dados de outra).

## 5. Resiliência e Backups

*   **Backups:** Snapshots automatizados diários (retenção de 30 dias) e backups contínuos de log de transações (Point-in-Time Recovery - PITR).
*   **Alta Disponibilidade:** Banco de dados operando com réplicas de leitura (Read Replicas) em zonas de disponibilidade diferentes.
