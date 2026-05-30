# LC SmileCare Premium

Plataforma SaaS odontológica premium para o Dr. Leonardo César, Cirurgião-Dentista | CRO-MG 24068. Focada em agendamentos, CRM (leads), fluxo financeiro e prontuários odontológicos sob o mais alto padrão de segurança e estética visual.

## 🚀 Tecnologias e Stack (Front-end)

- **Vite:** Build tool extremamente rápido.
- **React 19:** Biblioteca JavaScript para criação de interfaces.
- **TypeScript 5:** Tipagem estática para maior segurança no código.
- **CSS Modules:** Estilização componentizada (`.module.css`) para evitar conflitos de escopo.
- **Design System:** Estética Dark Mode Premium (`#0F172A`, `#1E293B`, `#0EA5E9`), componentes em Glassmorphism e tipografia baseada no Google Fonts (Inter).

## 📦 Como instalar

Certifique-se de ter o [Node.js](https://nodejs.org/) (versão 18 ou superior) instalado.

1. Clone o repositório ou navegue até o diretório do projeto:
   ```bash
   cd lc-smilecare-premium
   ```

2. Instale as dependências usando NPM:
   ```bash
   npm install
   ```

## 💻 Como rodar localmente (Desenvolvimento)

Para iniciar o servidor de desenvolvimento e visualizar a aplicação:

```bash
npm run dev
```

Acesse o endereço exibido no terminal, geralmente: `http://localhost:5173`.

## 🏗️ Como fazer build (Produção)

Para gerar os arquivos estáticos otimizados para produção:

```bash
npm run build
```

Isso fará a checagem rigorosa de tipos (TypeScript) e criará uma pasta `dist/` com o conteúdo minificado.
Para visualizar a versão de produção localmente, você pode usar:
```bash
npm run preview
```

## 🔒 Observações de Segurança e LGPD

Esta aplicação lida com **dados sensíveis de saúde**. O front-end atual é um protótipo com *dados mockados e anonimizados*. Ao integrar com o back-end, as seguintes regras são estritamente exigidas:

1.  **Dados Fictícios:** Este repositório não contém e nunca deve conter dados reais de pacientes.
2.  **Criptografia na Aplicação:** Campos clínicos como `anamnese`, `alergias`, `evoluções clínicas` e `receituários` exigem criptografia em nível de aplicação (AES-256) antes de serem enviados para persistência no banco de dados.
3.  **Controle de Acesso (RBAC):** O acesso a módulos específicos (prontuários, finanças) está atrelado aos papéis (`ADMIN`, `DENTIST`, `RECEPTIONIST`).
4.  **Autenticação Dupla (2FA):** Obrigatória para todos os perfis com acesso a dados sensíveis.
5.  **Auditoria Constante:** O back-end manterá um log inalterável de quem acessou/modificou qual prontuário e quando.
6.  **LGPD:** Toda coleta de dados (ex: Triagem na Landing Page) requer explícito aceite dos termos de consentimento, versionados em banco de dados.

*O Poder de Sorrir sem Limites!*
"# Dr.leonardo" 
"# Dr.leonardo" 
"# Dr.leonardo" 
"# Dr.leonardo" 
